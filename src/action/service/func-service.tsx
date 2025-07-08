'use server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod';

// --- ATUALIZADO ---
// Zod Schema agora inclui os novos campos para validação
const FuncionarioSchema = z.object({
    nome: z.string().min(3, "Nome é obrigatório."),
    cpf: z.string().min(14, "CPF inválido."),
    telefone: z.string().min(14, "Telefone inválido."), // Valida o telefone formatado
    cargo: z.string().min(1, "Cargo é obrigatório."),
    sexo: z.string().min(1, "Sexo é obrigatório."),
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
        // Retorna uma mensagem de erro mais específica se possível
        const firstError = Object.values(validated.error.flatten().fieldErrors)[0]?.[0] || "Dados inválidos.";
        return { sucesso: false, message: firstError };
    }

    // --- ATUALIZADO ---
    // Desestrutura os novos campos validados
    const { nome, cpf, telefone, cargo, sexo, turno, alojamentoId } = validated.data;

    try {
        // --- ATUALIZADO ---
        // Adiciona os novos campos na criação do registro no Prisma
        await prisma.cadastro_funcionario.create({
            data: {
                nome,
                cpf,
                telefone,
                cargo,
                sexo,
                turno,
                alojamentoId, // Prisma espera o ID numérico aqui para criar a relação
            },
        });

        console.log("FUNCIONARIO CRIADO COM SUCESSO");
        return { sucesso: true, message: "Funcionário criado!" };

    } catch (error: any) {
        console.error("Erro ao criar funcionário no Prisma:", error);

        // Verifica se o erro é de violação de chave única (CPF duplicado)
        if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
            return { sucesso: false, message: "Este CPF já está cadastrado." };
        }

        return { sucesso: false, message: "Falha ao salvar no banco de dados." };
    }
}
