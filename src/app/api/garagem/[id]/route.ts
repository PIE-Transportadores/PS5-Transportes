export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
    const params = await context.params;
    const id = Number(params.id);

    const data = await req.json();

    const prismaData = {
        ...data,
        garagem: data.nome_garagem ?? data.garagem, 
    };

    delete prismaData.nome_garagem;

    await prisma.cadastro_garagem.update({
        where: { id },
        data: prismaData,
    });

    return new Response(JSON.stringify("Garagem atualizada"), { status: 200 });
}


export async function DELETE(req: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
    const params = await context.params;
    const id = Number(params.id);

    await prisma.cadastro_garagem.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Garagem excluída com sucesso" });
}


export async function GET(req: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
    const params = await context.params;
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const garagem = await prisma.cadastro_garagem.findUnique({
        where: { id },
    });

    if (!garagem) {
        return NextResponse.json({ error: "Garagem não encontrada" }, { status: 404 });
    }

    return NextResponse.json(garagem);
}
