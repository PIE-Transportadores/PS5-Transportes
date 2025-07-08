// filepath: src/app/api/destinos/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  await prisma.cadastro_destino.delete({ where: { id } })
  return NextResponse.json({ sucesso: true })
}

async function buscarLatLongPorEndereco(endereco: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'SeuAppDeLogistica/1.0' } // Nominatim exige um User-Agent
        });
        if (!response.ok) return { latitude: null, longitude: null };
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon)
            };
        }
        return { latitude: null, longitude: null };
    } catch (error) {
        console.error("Erro na geocodificação:", error);
        return { latitude: null, longitude: null };
    }
}

// Schema de validação para os dados que chegam no PUT
const DestinoUpdateSchema = z.object({
    destino: z.string().min(1, "Nome do destino é obrigatório"),
    rua: z.string().min(1, "Rua é obrigatória"),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().min(2, "Estado inválido").max(2),
    numero: z.string().min(1, "Número é obrigatório"),
    cep: z.string().min(8, "CEP inválido").max(9),
});

// GET: Busca um destino específico pelo ID para preencher o formulário.
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }
        const destino = await prisma.cadastro_destino.findUnique({ where: { id } });
        if (!destino) {
            return NextResponse.json({ error: "Destino não encontrado" }, { status: 404 });
        }
        return NextResponse.json(destino);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar destino." }, { status: 500 });
    }
}

// PUT: Atualiza o destino e recalcula as coordenadas.
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const validated = DestinoUpdateSchema.safeParse(body);

    if (!validated.success) {
        return NextResponse.json({ error: "Dados inválidos", details: validated.error.flatten() }, { status: 400 });
    }

    const { destino, rua, bairro, cidade, estado, numero, cep } = validated.data;

    try {
        const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, Brasil`;
        const { latitude, longitude } = await buscarLatLongPorEndereco(enderecoCompleto);

        if (!latitude || !longitude) {
            return NextResponse.json({ error: "Não foi possível encontrar as coordenadas para o endereço fornecido. Verifique os dados." }, { status: 400 });
        }

        const destinoAtualizado = await prisma.cadastro_destino.update({
            where: { id },
            data: {
                destino,
                rua,
                bairro,
                cidade,
                estado,
                numero: Number(numero),
                cep: cep.replace(/\D/g, ''),
                latitude,
                longitude
            }
        });

        return NextResponse.json(destinoAtualizado);

    } catch (error) {
        console.error("Erro ao atualizar destino:", error);
        return NextResponse.json({ error: "Falha ao atualizar destino no banco de dados." }, { status: 500 });
    }
}
