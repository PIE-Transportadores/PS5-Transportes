'use server'
import { prisma } from '@/lib/prisma'

export default async function CriarAloj(prevState: any, formData: FormData) {
    try {
        const alojamento = formData.get('nome') as string
        const rua = formData.get('rua') as string
        const bairro = formData.get('bairro') as string
        const numero = Number(formData.get('numero'))
        const cep = Number(formData.get('cep'))

        await prisma.cadastro_alojamento.create({
            data: { 
                alojamento, 
                rua, 
                bairro, 
                numero, 
                cep, 
            },
        })

        return { sucesso: true }
    } catch (error) {
        console.error(error)
        return { erro: "Falha ao criar alojamento" }
    }
}