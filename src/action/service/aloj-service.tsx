'use server'
import { prisma } from '@/lib/prisma'

export default async function CriarAloj(prevState: any, formData: FormData) {
    try {
        const nome = formData.get('nome') as string
        const rua = formData.get('rua') as string
        const bairro = formData.get('bairro') as string
        const numero = Number(formData.get('numero'))
        const cep = formData.get('cep') as string

        await prisma.alojamento.create({
            data: { nome, rua, bairro, numero, cep }
        })

        return { sucesso: true }
    } catch (error) {
        console.error(error)
        return { erro: "Falha ao criar alojamento" }
    }
}