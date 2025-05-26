'use server'
import {prisma} from '@/lib/prisma'

export default async function CriarVeic(prevState: any,formData:FormData){

 

    const placa = formData.get('placa') as string
    const garagem = formData.get('garagem') as string
    const marca = formData.get('marca') as string
    const ano     = Number(formData.get('ano'))
    const tipo    = formData.get('tipo') as string

    await prisma.cadastro_veiculo.create({
        data:{
            placa,
            garagem,
            marca,
            ano,
            tipo,
        },
    })
    console.log("Veiculos!!!")

    return {sucesso:true}
}
