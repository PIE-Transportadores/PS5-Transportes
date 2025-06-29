// Cole este código no arquivo: src/app/api/alojamentos/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // CORREÇÃO: Usando o nome exato do seu model no schema.prisma
        const alojamentos = await prisma.cadastro_alojamento.findMany();
        
        return NextResponse.json(alojamentos);

    } catch (error) {
        console.error("Erro ao buscar alojamentos:", error);
        return new NextResponse('Erro interno do servidor', { status: 500 });
    }
}