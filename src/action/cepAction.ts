// /src/action/cepActions.ts

"use server"; 

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getCoordinatesFromCEP, getAddressDetailsFromCEP } from '@/lib/geocode';

const prisma = new PrismaClient();

type TabelaComCep = 'cadastro_alojamento' | 'cadastro_destino' | 'cadastro_garagem';

// --- LÓGICA PARA PROCESSAMENTO ÚNICO ---

export interface UpdateCoordinatesPayload {
  tableName: TabelaComCep;
  recordId: number; 
  cep: string;
  pathToRevalidate?: string;
}

/**
 * Resolve o CEP e salva as coordenadas para um único registro.
 */
export async function resolveAndSaveCoordinates(payload: UpdateCoordinatesPayload) {
  const { tableName, recordId, cep, pathToRevalidate } = payload;

  if (!cep) {
    return { error: "CEP não foi fornecido." };
  }

  try {
    const coordinates = await getCoordinatesFromCEP(cep);

    if (!coordinates) {
      return { error: `Não foi possível encontrar coordenadas para o CEP ${cep}.` };
    }

    await (prisma[tableName] as any).update({
      where: { id: recordId },
      data: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return { success: true, coordinates };

  } catch (error) {
    console.error("Erro em resolveAndSaveCoordinates:", error);
    return { error: "Ocorreu um erro no servidor ao processar o CEP." };
  }
}


// --- LÓGICA PARA PROCESSAMENTO EM LOTE (PARA ROTAS) ---

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

interface RoutePoint {
  recordId: number;
  cep: string;
}

export interface BatchPayload {
  tableName: TabelaComCep;
  points: RoutePoint[];
  pathToRevalidate?: string;
}

/**
 * Processa uma lista de CEPs de uma rota, buscando coordenadas de forma controlada.
 */
export async function resolveRouteCoordinatesBatch(payload: BatchPayload) {
  const { tableName, points, pathToRevalidate } = payload;
  console.log(`Iniciando processamento em lote para ${points.length} pontos na tabela ${tableName}.`);

  const results = { success: 0, failed: 0, errors: [] as string[] };
  const updateOperations = [];

  for (const point of points) {
    try {
      const coordinates = await getCoordinatesFromCEP(point.cep);
      
      if (coordinates) {
        updateOperations.push(
          (prisma[tableName] as any).update({
            where: { id: point.recordId },
            data: { latitude: coordinates.latitude, longitude: coordinates.longitude },
          })
        );
        results.success++;
      } else {
        results.failed++;
        results.errors.push(`CEP ${point.cep} (ID: ${point.recordId}) não encontrado.`);
      }
      await delay(200);
    } catch (error) {
      const e = error as Error;
      results.failed++;
      results.errors.push(`Erro ao processar CEP ${point.cep}: ${e.message}`);
    }
  }

  try {
    if (updateOperations.length > 0) {
      await prisma.$transaction(updateOperations);
      console.log(`${updateOperations.length} registros atualizados no banco de dados.`);
    }
  } catch (dbError) {
    console.error("Erro na transação do Prisma:", dbError);
    return { error: "Ocorreu um erro ao salvar os dados. Nenhuma alteração foi feita.", details: results };
  }
  
  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }

  console.log("Processamento em lote finalizado.", results);
  return { success: true, details: results };
}


// --- NOVO: DEFINIÇÃO DO TIPO DE RESPOSTA (O CONTRATO) ---
// Adicionamos este tipo para que o TypeScript saiba exatamente o que esperar como retorno.
export type CepActionResponse =
  | {
      success: true;
      data: {
        address: string;
        district: string;
        city: string;
        state: string;
        latitude: number;
        longitude: number;
      };
    }
  | {
      success: false;
      error: string;
    };


// --- MUDANÇA AQUI: Aplicando o tipo de retorno Promise<CepActionResponse> ---
export async function getAddressFromCepAction(cep: string): Promise<CepActionResponse> {
  try {
    // Faz as duas chamadas em paralelo dentro do servidor
    const [addressDetails, coordinates] = await Promise.all([
      getAddressDetailsFromCEP(cep),
      getCoordinatesFromCEP(cep)
    ]);

    if (!addressDetails || !coordinates) {
      return { success: false, error: 'CEP não encontrado ou inválido.' };
    }

    // Retorna um único objeto de sucesso com todos os dados juntos
    return { 
      success: true, 
      data: {
        address: addressDetails.address,
        district: addressDetails.district,
        city: addressDetails.city,
        state: addressDetails.state,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      } 
    };

  } catch (error) {
    console.error("Erro na Server Action getAddressFromCepAction:", error);
    return { success: false, error: "Ocorreu um erro no servidor ao buscar dados do CEP." };
  }
}