'use server'
import {prisma} from '@/lib/prisma'

export default async function CriarGaragem(prevState: any, formData: any) {

    // Se formData não for do tipo FormData, acesse as propriedades diretamente
    if (typeof formData !== 'object') {
        throw new Error("formData precisa ser um objeto.");
    }

    const garagem = formData.nome_garagem as string;
    const rua = formData.rua as string;
    const bairro = formData.bairro as string;
    const numero = Number(formData.numero);
    const cep = formData.cep as string;
    const latitude = formData.latitude as string;
    const longitude = formData.longitude as string;

    console.log(Object.keys(prisma));

    await prisma.cadastro_garagem.create({
        data: {
            garagem,
            rua,
            bairro,
            numero,
            cep,
            latitude,
            longitude,
        },
    });
    console.log("GARAGEM CADASTRADA");

    return { sucesso: true };
}
