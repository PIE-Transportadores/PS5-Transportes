import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function GET() {
    try{

        const funcionario = await prisma.cadastro_funcionario.findMany()
        return NextResponse.json(funcionario)

    }catch(error){

        return NextResponse.json({error: "Erro ao buscar o funcionario"},{status:500})

    }
    
}

export async function DELETE(req:Request,{params}:{params:{id: string}}){

    const id = Number(params.id)

    await prisma.cadastro_funcionario.delete({
        where : {
            id
        }
    })

    return NextResponse.json({ message: "Funcionário excluído com sucesso" })
    
}