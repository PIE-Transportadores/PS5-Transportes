// app/api/servicos/[id]/rota-data/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const servicoId = parseInt(params.id);

    if (isNaN(servicoId)) {
      return NextResponse.json({ error: 'ID de serviço inválido' }, { status: 400 });
    }

    // Usando o poder das relações do Prisma para buscar tudo de uma vez!
    const servico = await prisma.cadastro_servico.findUnique({
      where: {
        id: servicoId,
      },
      include: {
        // Inclui os dados da garagem relacionada
        garagem: true, 
        // Inclui os dados do destino relacionado
        destino: true,
        // Inclui a lista de funcionários associados
        funcionarios: {
          include: {
            // Para cada funcionário, inclui seus dados completos
            funcionario: {
              include: {
                // E para cada funcionário, inclui os dados do seu alojamento
                alojamento: true,
              },
            },
          },
        },
      },
    });

    if (!servico) {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
    }

    // 1. Validação e extração do Ponto de Partida (Origem)
    if (!servico.garagem?.latitude || !servico.garagem?.longitude) {
        return NextResponse.json({ error: 'Coordenadas da garagem não encontradas. Verifique o cadastro da garagem.' }, { status: 400 });
    }
    const origin = {
      lat: servico.garagem.latitude,
      lng: servico.garagem.longitude,
    };

    // 2. Validação e extração do Ponto Final (Destino)
    if (!servico.destino?.latitude || !servico.destino?.longitude) {
        return NextResponse.json({ error: 'Coordenadas do destino não encontradas. Verifique o cadastro do destino.' }, { status: 400 });
    }
    const destination = {
      lat: servico.destino.latitude,
      lng: servico.destino.longitude,
    };

    // 3. Mapeamento e validação dos Pontos de Parada (Waypoints)
    const waypoints = servico.funcionarios
      .map(item => item.funcionario.alojamento)
      .filter(alojamento => alojamento && alojamento.latitude && alojamento.longitude) // Filtra alojamentos nulos ou sem coordenadas
      .map(alojamento => ({
        location: { lat: alojamento.latitude, lng: alojamento.longitude },
        stopover: true,
      }));
      
    // Removemos duplicatas caso múltiplos funcionários estejam no mesmo alojamento
    const uniqueWaypoints = Array.from(new Map(waypoints.map(item => [JSON.stringify(item.location), item])).values());

    // Monta o objeto final para a resposta da API
    const rotaData = {
      origin,
      destination,
      waypoints: uniqueWaypoints,
    };

    return NextResponse.json(rotaData);

  } catch (error) {
    console.error("Erro na API de rota:", error);
    return NextResponse.json({ error: 'Ocorreu um erro interno no servidor.' }, { status: 500 });
  }
}
