'use server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod';

// Zod Schema para validação robusta dos dados do destino no servidor
const DestinoSchema = z.object({
    destino: z.string().min(3, "O nome do destino é obrigatório."),
    cep: z.string().length(8, "O CEP deve ter 8 dígitos."),
    rua: z.string().min(1, "A rua é obrigatória."),
    bairro: z.string().min(1, "O bairro é obrigatório."),
    cidade: z.string().min(1, "A cidade é obrigatória."),
    estado: z.string().min(1, "O estado é obrigatório."),
    // z.coerce.number() tenta converter a string recebida do formulário para um número.
    numero: z.coerce.number({ invalid_type_error: "O número deve ser um valor numérico." }).min(1, "O número é obrigatório."),
    latitude: z.coerce.number({ invalid_type_error: "Latitude inválida." }),
    longitude: z.coerce.number({ invalid_type_error: "Longitude inválida." }),
});

export default async function CriarDestino(prevState: any, formData: FormData) {
    
    // Converte o FormData para um objeto simples que o Zod pode entender
    const rawData = Object.fromEntries(formData.entries());

    // Valida os dados usando o schema do Zod
    const validated = DestinoSchema.safeParse(rawData);

    // Se a validação falhar, retorna com os detalhes do erro
    if (!validated.success) {
        console.error("Erro de Validação:", validated.error.flatten().fieldErrors);
        return { 
            sucesso: false, 
            message: "Dados inválidos. Verifique os campos preenchidos.",
            errors: validated.error.flatten().fieldErrors 
        };
    }
    
    // Se a validação passar, desestrutura os dados já com os tipos corretos
    const { destino, cep, rua, bairro, cidade, estado, numero, latitude, longitude } = validated.data;

    try {
        // Cria o registro no banco de dados com os dados validados e convertidos
        await prisma.cadastro_destino.create({
            data: {
                destino,
                cep,
                rua,
                bairro,
                cidade,
                estado,
                numero,   // Agora é um número (Int)
                latitude, // Agora é um número (Float)
                longitude // Agora é um número (Float)
            }
        });

        console.log("DESTINO CRIADO COM SUCESSO");
        return { sucesso: true, message: "Destino criado com sucesso!" };

    } catch (error) {
        console.error("Erro do Prisma ao criar destino:", error);
        return { sucesso: false, message: "Falha ao salvar o destino no banco de dados." };
    }
}
