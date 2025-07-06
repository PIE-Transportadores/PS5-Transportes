// /src/action/cepActions.ts

"use server"; 

import { PrismaClient } from '@prisma/client';
import { getCoordinatesFromCEP } from '@/lib/geocode';
import { revalidatePath } from 'next/cache';
import { getAddressDetailsFromCEP } from '@/lib/geocode';

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
<<<<<<< HEAD
=======
}

export async function getAddressFromCepAction(cep: string) {
  // Ela chama a nossa nova função, sem tocar na de coordenadas
  const addressDetails = await getAddressDetailsFromCEP(cep);

  if (!addressDetails) {
    return { error: 'CEP não encontrado ou inválido.' };
  }

  return { success: true, data: addressDetails };
>>>>>>> Joao-lira
}