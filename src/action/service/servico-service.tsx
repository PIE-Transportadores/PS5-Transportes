'use server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod';

// Schema de validação para o serviço
const ServicoSchema = z.object({
    servico: z.string().min(3, "Nome do serviço é obrigatório."),
    garagemId: z.coerce.number().min(1, "Garagem é obrigatória."),
    destinoId: z.coerce.number().min(1, "Destino é obrigatório."),
    dataInicio: z.coerce.date({ required_error: "Data de início é obrigatória." }),
    dataFim: z.coerce.date({ required_error: "Data de fim é obrigatória." }),
    // O campo de funcionários vem de forma diferente (getAll), então validamos separadamente
});

export default async function CriarServico(prevState: any, formData: FormData) {
    
    const rawData = Object.fromEntries(formData.entries());
    const funcionariosSelecionados = formData.getAll('funcionarios').map(String); // Pega todos os IDs de funcionários

    // Valida os campos principais
    const validated = ServicoSchema.safeParse(rawData);

    if (!validated.success) {
        console.error("Erro de validação:", validated.error.flatten().fieldErrors);
        return { sucesso: false, message: "Dados do serviço inválidos." };
    }

    // Valida o campo de funcionários
    if (funcionariosSelecionados.length === 0) {
        return { sucesso: false, message: "Selecione ao menos um funcionário." };
    }

    const { servico, garagemId, destinoId, dataInicio, dataFim } = validated.data;

    try {
        // Cria o serviço e, na mesma transação, cria as associações com os funcionários
        const novoServico = await prisma.cadastro_servico.create({
            data: {
                servico,
                dataInicio,
                dataFim,
                garagemId, // Salva a relação com a garagem
                destinoId, // Salva a relação com o destino
                // Cria as associações na tabela 'servico_funcionario'
                funcionarios: {
                    create: funcionariosSelecionados.map(funcId => ({
                        funcionarioId: parseInt(funcId),
                    })),
                },
            },
        });

        console.log('Serviço criado e funcionários associados:', novoServico.id);
        return { sucesso: true, message: "Serviço criado com sucesso!" };

    } catch (error) {
        console.error("Erro ao criar serviço no Prisma:", error);
        return { sucesso: false, message: "Falha ao salvar o serviço no banco de dados." };
    }
}
