'use server'
import { prisma } from '@/lib/prisma'
// 1. Importamos a nossa função de geocodificação
import { getCoordinatesFromCEP } from '@/lib/geocode'

export default async function CriarAloj(prevState: any, formData: FormData) {
    try {
        // Obtenção dos dados do formulário
        const alojamento = formData.get('nome') as string
        const rua = formData.get('rua') as string
        const bairro = formData.get('bairro') as string
        const numero = Number(formData.get('numero'))
        const cep = formData.get('cep') as string // Corrigido para string
        const capacidade = Number(formData.get('capacidade'))

        if (!alojamento || !rua || !bairro || !numero || !cep || !capacidade) {
            return { erro: "Todos os campos são obrigatórios." }
        }

        // 2. CHAMAMOS A API DE CEP AQUI, ANTES DE CRIAR O REGISTRO
        const coordinates = await getCoordinatesFromCEP(cep)

        // 3. Criação do registro no banco, agora incluindo as coordenadas
        await prisma.cadastro_alojamento.create({
            data: { 
                alojamento, 
                rua, 
                bairro, 
                numero, 
                cep, 
                capacidade,
                // Adicionamos a latitude e longitude (se encontradas)
                latitude: coordinates?.latitude ?? null,
                longitude: coordinates?.longitude ?? null,
            },
        })

        return { sucesso: true }
    } catch (error) {
        console.error("Erro ao criar alojamento:", error)
        return { erro: "Falha ao criar alojamento no servidor." }
    }
}