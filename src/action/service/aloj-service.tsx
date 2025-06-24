'use server'
import { prisma } from '@/lib/prisma'

export default async function CriarAloj(prevState: any, formData: FormData) {
    try {
        // Obtenção dos dados do formulário
        const alojamento = formData.get('nome') as string
        const rua = formData.get('rua') as string
        const bairro = formData.get('bairro') as string
        const numero = Number(formData.get('numero'))
        const cep = Number(formData.get('cep'))
        const capacidade = Number(formData.get('capacidade')) // Obtendo o novo campo 'capacidade'

        // Validações básicas (opcional, mas recomendado)
        if (!alojamento || !rua || !bairro || !numero || !cep || !capacidade) {
            return { erro: "Todos os campos são obrigatórios." }
        }

        // Criação do registro no banco de dados com o novo campo
        await prisma.cadastro_alojamento.create({
            data: { 
                alojamento, 
                rua, 
                bairro, 
                numero, 
                cep, 
                capacidade, // Adicionando 'capacidade' ao objeto de dados
            },
        })

        // Retorno de sucesso
        return { sucesso: true }
    } catch (error) {
        console.error("Erro ao criar alojamento:", error)
        // Retorno de erro genérico
        return { erro: "Falha ao criar alojamento no servidor." }
    }
}