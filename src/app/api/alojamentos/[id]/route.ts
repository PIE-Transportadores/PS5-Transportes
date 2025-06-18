// Caminho do arquivo: src/app/api/alojamentos/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define um tipo para o contexto da rota para reutilização
type RouteContext = {
    params: {
        id: string;
    };
};

// Função GET (Busca um)
export async function GET(request: Request, context: RouteContext) {
    try {
        const id = parseInt(context.params.id, 10);
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

// ==================================================================
// CORREÇÃO NA FUNÇÃO DELETE
// A assinatura precisa ter 'request' e 'context', nesta ordem.
// ==================================================================
export async function DELETE(request: Request, context: RouteContext) {
    try {
        const id = parseInt(context.params.id, 10);
        if (isNaN(id)) {
            return new NextResponse('ID inválido', { status: 400 });
        }

        await prisma.cadastro_alojamento.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 }); // Sucesso, sem conteúdo
    } catch (error) {
        console.error("Erro ao deletar alojamento:", error);
        return new NextResponse('Erro interno do servidor', { status: 500 });
    }
}

// Função PUT (Atualiza um)
export async function PUT(request: Request, context: RouteContext) {
    try {
        const id = parseInt(context.params.id, 10);
        if (isNaN(id)) {
            return new NextResponse('ID inválido', { status: 400 });
        }

        const data = await request.json();

        const alojamentoAtualizado = await prisma.cadastro_alojamento.update({
            where: { id },
            data: {
                alojamento: data.nome,
                bairro: data.bairro,
                rua: data.rua,
                numero: parseInt(data.numero, 10),
                cep: parseInt(data.cep, 10)
            },
        });

        return NextResponse.json(alojamentoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar alojamento:", error);
        return new NextResponse('Erro interno do servidor', { status: 500 });
    }
}