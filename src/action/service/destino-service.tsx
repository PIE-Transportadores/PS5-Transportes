'use server'

import { z } from 'zod';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// IMPORTADO: A função correta do seu arquivo geocode.ts, que usa a Awesome API.
import { getCoordinatesFromCEP } from '@/lib/geocode'; 

// Definição do Schema com a conversão de 'numero' para tipo numérico
const destinoSchema = z.object({
    destino: z.string().min(3, "O nome do destino é obrigatório."),
    cep: z.string().length(8, "CEP inválido."),
    rua: z.string().min(1, "A rua é obrigatória."),
    bairro: z.string().min(1, "O bairro é obrigatório."),
    cidade: z.string().min(1, "A cidade é obrigatória."),
    estado: z.string().length(2, "O estado é obrigatório."),
    numero: z.coerce.number({ invalid_type_error: "O número deve ser um valor numérico."})
                     .int("O número deve ser um inteiro.")
                     .positive("O número deve ser positivo."),
});

// REMOVIDO: A função antiga que usava Nominatim. Não precisamos mais dela.
// async function buscarLatLongPorEndereco(...) { ... }


/**
 * Server Action para criar um novo destino, agora usando o método correto.
 */
export default async function CriarDestino(prevState: any, formData: FormData) {
    const dados = Object.fromEntries(formData);
    
    const validatedFields = destinoSchema.safeParse(dados);
    if (!validatedFields.success) {
        return {
            sucesso: false,
            message: "Erro de validação nos campos.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // MUDANÇA PRINCIPAL: Usamos a função getCoordinatesFromCEP, passando apenas o CEP.
    // Exatamente como o CriarAloj faz.
    const coordinates = await getCoordinatesFromCEP(validatedFields.data.cep);

    if (coordinates === null) {
        return {
            sucesso: false,
            // Mensagem mais clara, pois agora a busca é pelo CEP
            message: "Erro: Não foi possível encontrar as coordenadas para o CEP informado.",
            errors: null,
        };
    }

    try {
        await prisma.cadastro_destino.create({
            data: {
                destino: validatedFields.data.destino,
                cep: validatedFields.data.cep,
                rua: validatedFields.data.rua,
                bairro: validatedFields.data.bairro,
                cidade: validatedFields.data.cidade,
                estado: validatedFields.data.estado,
                numero: validatedFields.data.numero,
                // Os valores de latitude e longitude agora vêm da Awesome API
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            },
        });

        revalidatePath('/destinos');
        return {
            sucesso: true,
            message: "Destino cadastrado com sucesso!",
            errors: null,
        };

    } catch (error) {
        console.error("Erro ao salvar destino no banco de dados:", error);
        return {
            sucesso: false,
            message: "Erro interno do servidor. Não foi possível salvar o destino.",
            errors: null,
        };
    }
}