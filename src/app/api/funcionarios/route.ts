'use server'
import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function GET() {
    try{

        const funcionario = await prisma.cadastro_funcionario.findMany()

        console.log("GET /api/funcionarios chamado ✅")
        return NextResponse.json(funcionario)
        
        

    }catch(error){

        return NextResponse.json({error: "Erro ao buscar o funcionario"},{status:500})

    }
}
