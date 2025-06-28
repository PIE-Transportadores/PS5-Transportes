import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    const garagens = await prisma.cadastro_garagem.findMany();
    return NextResponse.json(garagens);
}
