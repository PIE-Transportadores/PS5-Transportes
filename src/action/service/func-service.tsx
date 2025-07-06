'use server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod';

// Zod Schema para validação robusta no servidor
const FuncionarioSchema = z.object({
    nome: z.string().min(3, "Nome é obrigatório."),
    cpf: z.string().min(14, "CPF inválido."),
    turno: z.string().min(1, "Turno é obrigatório."),
    alojamentoId: z.coerce.number().min(1, "Alojamento é obrigatório.") // z.coerce tenta converter string para número
});

export default async function CriarFunc(prevState: any, formData: FormData) {
    
    // Converte FormData para um objeto simples
    const rawData = Object.fromEntries(formData.entries());

    // Valida os dados com Zod
    const validated = FuncionarioSchema.safeParse(rawData);

    if (!validated.success) {
        console.error("Erro de validação:", validated.error.flatten().fieldErrors);
        return { sucesso: false, message: "Dados inválidos." };
    }

    const { nome, cpf, turno, alojamentoId } = validated.data;

    try {
        await prisma.cadastro_funcionario.create({
            data: {
                nome,
                cpf,
                turno,
                alojamentoId, // Prisma espera o ID numérico aqui para criar a relação
            },
        });

        console.log("FUNCIONARIO CRIADO COM SUCESSO");
        return { sucesso: true, message: "Funcionário criado!" };

    } catch (error) {
        console.error("Erro ao criar funcionário no Prisma:", error);
        return { sucesso: false, message: "Falha ao salvar no banco de dados." };
    }
}
