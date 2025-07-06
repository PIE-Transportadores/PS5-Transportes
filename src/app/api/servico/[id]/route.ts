export const runtime = 'nodejs'
import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'




export async function DELETE(req:Request,{params}:{params:{id: string}}){

    const id = Number(params.id)

    await prisma.cadastro_servico.delete({
        where : {
            id
        }
    })

    return NextResponse.json({ message: "Serviço excluído com sucesso" })
    
}

export async function PUT(req:NextRequest, {params}: {params:{id: string}}){
    const id = parseInt(params.id)
    const data = await req.json()

    await prisma.cadastro_servico.update({
        where: {
            id
        },
        data
    })
    return new Response(JSON.stringify("Serviço Atualizado"), { status: 200 })
}




export async function GET(req:NextRequest, {params}: {params:{id: string}}){

    const id = Number(params.id)
    

   const servico = await prisma.cadastro_servico.findUnique({
        where:{
            id,
        },
        
    })
    return NextResponse.json(servico)

}
    
