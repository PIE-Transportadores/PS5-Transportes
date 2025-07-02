// /src/app/teste-cep/page.tsx

import { PrismaClient } from '@prisma/client';
import { TestComponent } from './TestComponent'; // Criaremos este componente logo abaixo

const prisma = new PrismaClient();

// Esta função roda no servidor para buscar os dados do banco
async function getData() {
  // Vamos buscar os primeiros 5 alojamentos para nosso teste
  const alojamentos = await prisma.cadastro_alojamento.findMany({
    take: 5,
  });
  return alojamentos;
}

// A página principal que renderiza o componente de teste
export default async function PaginaDeTesteCep() {
  const data = await getData();

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Página de Teste de Geocodificação de CEP</h1>
      <p>
        Esta página busca dados reais da sua tabela <strong>cadastro_alojamento</strong>.
        Use os botões para testar as Server Actions.
      </p>
      {/* Passamos os dados para um componente de cliente que terá os botões */}
      <TestComponent initialData={data} />
    </div>
  );
}