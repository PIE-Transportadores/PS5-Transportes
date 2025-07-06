'use server'
import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function GET() {
    try{

        const servico = await prisma.cadastro_servico.findMany()

        
        return NextResponse.json(servico)
        
        

    }catch(error){

        return NextResponse.json({error: "Erro ao buscar o serviço"},{status:500})

    }
}