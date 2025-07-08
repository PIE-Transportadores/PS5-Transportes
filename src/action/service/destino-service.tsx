// action/service/destino-service.ts

'use server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod';

// Schema de validação para os dados do formulário
const DestinoSchema = z.object({
    destino: z.string().min(1, "O nome do destino é obrigatório."),
    rua: z.string().min(1, "A rua é obrigatória."),
    bairro: z.string().min(1, "O bairro é obrigatório."),
    cidade: z.string().min(1, "A cidade é obrigatória."),
    estado: z.string().min(2, "O estado é inválido.").max(2),
    numero: z.string().min(1, "O número é obrigatório."),
    cep: z.string().min(8, "O CEP é inválido.").max(9),
    latitude: z.coerce.number({ invalid_type_error: "Latitude inválida." }),
    longitude: z.coerce.number({ invalid_type_error: "Longitude inválida." }),
});

export default async function CriarDestino(prevState: any, formData: FormData) {
    
    const rawData = Object.fromEntries(formData.entries());

    const validated = DestinoSchema.safeParse(rawData);

    if (!validated.success) {
        const firstError = Object.values(validated.error.flatten().fieldErrors)[0]?.[0];
        return { sucesso: false, message: firstError || "Erro de validação nos campos." };
    }

    const { destino, rua, bairro, cidade, estado, numero, cep, latitude, longitude } = validated.data;

    try {
        await prisma.cadastro_destino.create({
            data: {
                destino,
                rua,
                bairro,
                cidade,
                estado,
                numero: Number(numero),
                cep: cep.replace(/\D/g, ''),
                latitude,
                longitude,
            },
        });

        return { sucesso: true, message: "Destino cadastrado com sucesso!" };

    } catch (error) {
        console.error("Erro ao criar destino:", error);
        return { sucesso: false, message: "Falha ao salvar no banco de dados." };
    }
}
