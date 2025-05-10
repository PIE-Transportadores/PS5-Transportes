'use server'
import {prisma} from '@/lib/prisma'

export default async function CriarFunc(prevState: any,formData:FormData){

    const nome = formData.get('nome') as string
    const cpf = Number(formData.get('cpf'))
    const turno = formData.get('turno') as string
    const alojamento = formData.get('alojamento') as string

    await prisma.cadastro_funcionario.create({
        data:{
            nome,
            cpf,
            turno,
            alojamento,
        },
    })
    console.log("FUNCIONARIO CRIADO")

    return {sucesso:true}
}
