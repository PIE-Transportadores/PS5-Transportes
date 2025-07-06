// Caminho do arquivo: app/api/servico/[id]/rota-data/route.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Inicialize o Prisma Client fora da função para melhor performance
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    // Usando params.id para corresponder ao nome da pasta [id]
    const servicoId = parseInt(params.id, 10);

    // Validação para garantir que o ID é um número válido
    if (isNaN(servicoId)) {
      return NextResponse.json({ error: 'ID de serviço inválido. O parâmetro recebido na URL não é um número.' }, { status: 400 });
    }

    // Busca o serviço e todos os seus dados relacionados de uma vez
    const servico = await prisma.cadastro_servico.findUnique({
      where: {
        id: servicoId,
      },
      include: {
        garagem: true, 
        destino: true,
        funcionarios: {
          include: {
            funcionario: {
              include: {
                alojamento: true,
              },
            },
          },
        },
      },
    });

    // Se o serviço não for encontrado no banco de dados
    if (!servico) {
      return NextResponse.json({ error: `Serviço com ID ${servicoId} não encontrado` }, { status: 404 });
    }

    // Validação das coordenadas da GARAGEM
    if (!servico.garagem?.latitude || !servico.garagem?.longitude) {
        return NextResponse.json({ error: 'Coordenadas da garagem não encontradas. Verifique o cadastro da garagem.' }, { status: 400 });
    }
    const origin = {
      lat: parseFloat(servico.garagem.latitude),
      lng: parseFloat(servico.garagem.longitude),
    };

    // Validação das coordenadas do DESTINO
    if (!servico.destino?.latitude || !servico.destino?.longitude) {
        return NextResponse.json({ error: 'Coordenadas do destino não encontradas. Verifique o cadastro do destino.' }, { status: 400 });
    }
    const destination = {
      lat: parseFloat(servico.destino.latitude),
      lng: parseFloat(servico.destino.longitude),
    };

    // Mapeamento e validação dos alojamentos dos funcionários como pontos de parada (waypoints)
    const waypoints = servico.funcionarios
      .map(item => item.funcionario?.alojamento) // Pega o alojamento de cada funcionário
      .filter(alojamento => alojamento && alojamento.latitude && alojamento.longitude) // Filtra os que não têm alojamento ou coordenadas
      .map(alojamento => ({
        location: { 
            lat: parseFloat(alojamento.latitude), 
            lng: parseFloat(alojamento.longitude) 
        },
        stopover: true, // Indica que é uma parada obrigatória
      }));
      
    // Remove duplicatas (caso múltiplos funcionários estejam no mesmo alojamento)
    const uniqueWaypoints = Array.from(new Map(waypoints.map(item => [JSON.stringify(item.location), item])).values());

    // Monta o objeto final com todos os dados da rota
    const rotaData = {
      origin,
      destination,
      waypoints: uniqueWaypoints,
    };

    // Retorna os dados da rota como um JSON de sucesso
    return NextResponse.json(rotaData);

  } catch (error) {
    // Captura qualquer outro erro inesperado que possa ocorrer
    console.error("Erro inesperado na API de rota:", error);
    return NextResponse.json({ error: 'Ocorreu um erro interno no servidor.' }, { status: 500 });
  }
}