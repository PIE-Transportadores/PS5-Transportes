export const runtime = 'nodejs'
import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'




export async function DELETE(req:Request,{params}:{params:{id: string}}){

    const id = Number(params.id)

    await prisma.cadastro_funcionario.delete({
        where : {
            id
        }
    })

    return NextResponse.json({ message: "Funcionário excluído com sucesso" })
    
}

export async function PUT(req:NextRequest, {params}: {params:{id: string}}){
    const id = parseInt(params.id)
    const data = await req.json()

    await prisma.cadastro_funcionario.update({
        where: {
            id
        },
        data
    })
    return new Response(JSON.stringify("FUncionario Atualizado"), { status: 200 })
}




export async function GET(req:NextRequest, {params}: {params:{id: string}}){

    const id = Number(params.id)
    

   const funcionario = await prisma.cadastro_funcionario.findUnique({
        where:{
            id,
        },
        
    })
    return NextResponse.json(funcionario)

}
    
