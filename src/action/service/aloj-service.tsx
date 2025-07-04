'use server'
import { prisma } from '@/lib/prisma'
// Importamos a função que busca as coordenadas
import { getCoordinatesFromCEP } from '@/lib/geocode'

// 1. Definimos um tipo explícito para o estado do formulário
export type FormState = {
  sucesso: boolean;
  erro: string | null;
}

// 2. Usamos o tipo 'FormState' na assinatura da função
export default async function CriarAloj(prevState: FormState, formData: FormData): Promise<FormState> {
    try {
        // Obtenção dos dados do formulário
        const alojamento = formData.get('nome') as string;
        const rua = formData.get('rua') as string;
        const bairro = formData.get('bairro') as string;
        const numero = Number(formData.get('numero'));
        const cep = formData.get('cep') as string; // CEP como string
        const capacidade = Number(formData.get('capacidade'));

        if (!alojamento || !rua || !bairro || !numero || !cep || !capacidade) {
            return { sucesso: false, erro: "Todos os campos são obrigatórios." };
        }

        // Chamamos a API de CEP aqui, antes de criar o registro
        const coordinates = await getCoordinatesFromCEP(cep);

        // Criação do registro no banco, agora incluindo as coordenadas
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
        });

        // 3. Garantimos que o retorno de sucesso também corresponda ao tipo
        return { sucesso: true, erro: null };

    } catch (error) {
        console.error("Erro ao criar alojamento:", error);
        // 4. Garantimos que o retorno de erro também corresponda ao tipo
        return { sucesso: false, erro: "Falha ao criar alojamento no servidor." };
    }
}