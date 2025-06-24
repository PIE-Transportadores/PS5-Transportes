// Caminho do arquivo: src/app/api/alojamentos/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Define um tipo para os parâmetros da rota, para reutilização e clareza
type RouteParams = {
    params: {
        id: string;
    };
};

// Função GET (Busca um)
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const id = parseInt(params.id, 10); // Usando params.id diretamente
        if (isNaN(id)) {
            return new NextResponse('ID inválido', { status: 400 });
        }

        const alojamento = await prisma.cadastro_alojamento.findUnique({
            where: { id },
        });

        if (!alojamento) {
            return new NextResponse('Alojamento não encontrado', { status: 404 });
        }

        return NextResponse.json(alojamento);
    } catch (error) {
        console.error("Erro ao buscar alojamento:", error);
        return new NextResponse('Erro interno do servidor', { status: 500 });
    }
}

// Função DELETE (Deleta um)
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const id = parseInt(params.id, 10); // Usando params.id diretamente
        if (isNaN(id)) {
            return new NextResponse('ID inválido', { status: 400 });
        }

        await prisma.cadastro_alojamento.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return new NextResponse('Alojamento não encontrado para deletar', { status: 404 });
        }
        console.error("Erro ao deletar alojamento:", error);
        return new NextResponse('Erro interno do servidor', { status: 500 });
    }
}

// Função PUT (Atualiza um)
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const id = parseInt(params.id, 10); // Usando params.id diretamente
        if (isNaN(id)) {
            return new NextResponse('ID inválido', { status: 400 });
        }
        
        const data = await request.json();
        const { nome, bairro, rua, numero, cep, capacidade } = data;

        const dadosParaAtualizar: Prisma.cadastro_alojamentoUpdateInput = {};

        if (nome !== undefined) dadosParaAtualizar.alojamento = nome;
        if (bairro !== undefined) dadosParaAtualizar.bairro = bairro;
        if (rua !== undefined) dadosParaAtualizar.rua = rua;

        if (numero !== undefined && numero !== null) {
            dadosParaAtualizar.numero = parseInt(String(numero), 10);
        }
        if (cep !== undefined && cep !== null) {
            dadosParaAtualizar.cep = parseInt(String(cep), 10);
        }
        if (capacidade !== undefined && capacidade !== null) {
            dadosParaAtualizar.capacidade = parseInt(String(capacidade), 10);
        }

        if (Object.keys(dadosParaAtualizar).length === 0) {
            return new NextResponse('Nenhum dado fornecido para atualização', { status: 400 });
        }

        const alojamentoAtualizado = await prisma.cadastro_alojamento.update({
            where: { id },
            data: dadosParaAtualizar,
        });

        return NextResponse.json(alojamentoAtualizado);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return new NextResponse('Alojamento não encontrado para atualizar', { status: 404 });
        }
        console.error("Erro ao atualizar alojamento:", error);
        return new NextResponse('Erro interno do servidor', { status: 500 });
    }
}
