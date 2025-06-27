import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export  async function GET(){

    const alojamento = await prisma.cadastro_alojamento.findMany()

    return NextResponse.json(alojamento)


}