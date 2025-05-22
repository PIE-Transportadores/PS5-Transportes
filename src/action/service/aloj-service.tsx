'use server'
import { prisma } from '@/lib/prisma'

export default async function CriarAloj(prevState: any, formData: FormData) {
    const nome = formData.get('nome') as string
    const rua = formData.get('rua') as string
    const bairro = formData.get('bairro') as string
    const numero = Number(formData.get('numero'))
    const cep = Number(formData.get('cep')) // Corrigido de 'cpf' para 'cep'

    await prisma.cadastro_alojamento.create({
        data: {
            nome,
            rua,
            bairro,
            numero,
            cep,
        },
    })

    console.log("Alojamento criado")

    return { sucesso: true }
} // Corrigido de ")" para "}"