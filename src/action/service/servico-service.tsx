'use server'
import {prisma} from '@/lib/prisma'

export default async function CriarServico(prevState: any,formData:FormData){

    const servico = formData.get('nome') as string
    const destino = formData.get('destino') as string
    const dataInicio = new Date(formData.get('data_inicio') as string)
    const dataFim = new Date( formData.get('data_fim') as string)
    
    await prisma.cadastro_servico.create({
        data:{
            servico,
            destino,
            dataInicio,
            dataFim,
        },
    })
    console.log("SERVIÇO  CRIADO")
    console.log("opa")

    return {sucesso:true}
}
