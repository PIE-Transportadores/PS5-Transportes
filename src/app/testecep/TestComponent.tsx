// /src/app/testecep/TestComponent.tsx

"use client";

import { useState } from 'react';
// 1. IMPORTAMOS O TIPO DIRETAMENTE DO PRISMA
import type { cadastro_alojamento } from '@prisma/client';

// Importe as duas actions que criamos
import {
  resolveAndSaveCoordinates,
  resolveRouteCoordinatesBatch,
} from '@/action/cepAction';

// 2. AGORA NÃO PRECISAMOS MAIS DESTE TIPO MANUAL. PODE APAGÁ-LO.
/* type Alojamento = {
  id: number;
  alojamento: string;
  cep: string;
  latitude: number | null;
  longitude: number | null;
}; 
*/

// 3. USAMOS O TIPO IMPORTADO DO PRISMA AQUI
export function TestComponent({ initialData }: { initialData: cadastro_alojamento[] }) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // --- Função para testar UM item por vez ---
  const handleSingleTest = async (item: cadastro_alojamento) => { // <-- Usamos o tipo aqui também
    alert(`Testando CEP ${item.cep} para "${item.alojamento}"...`);
    const result = await resolveAndSaveCoordinates({
      tableName: 'cadastro_alojamento',
      recordId: item.id,
      cep: item.cep,
    });

    if (result.error) {
      alert(`Erro: ${result.error}`);
    } else {
      alert('Sucesso! Recarregue a página para ver os dados atualizados.');
      window.location.reload();
    }
  };

  // --- Função para testar TODOS os itens em lote ---
  const handleBatchTest = async () => {
    setIsLoading(true);
    alert('Iniciando teste em lote para todos os itens...');

    const pointsToProcess = data.map(item => ({
      recordId: item.id,
      cep: item.cep,
    }));

    const result = await resolveRouteCoordinatesBatch({
      tableName: 'cadastro_alojamento',
      points: pointsToProcess,
    });

    if (result.error) {
      alert(`Erro: ${result.error}`);
    } else {
      alert(`Lote finalizado!\nSucesso: ${result.details.success}\nFalhas: ${result.details.failed}\n\nRecarregue a página para ver os dados atualizados.`);
      window.location.reload();
    }
    setIsLoading(false);
  };

  return (
    <>
      <div style={{ margin: '2rem 0', padding: '1rem', border: '2px solid blue' }}>
        <h2>Teste em Lote (Múltiplos Pontos)</h2>
        <button onClick={handleBatchTest} disabled={isLoading} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          {isLoading ? 'Processando...' : 'Resolver TODOS os CEPs da lista'}
        </button>
      </div>

      <hr />

      {data.map(item => (
        <div key={item.id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p><strong>{item.alojamento}</strong> (ID: {item.id})</p>
            <p>CEP: {item.cep}</p>
            <p style={{ color: item.latitude ? 'green' : '#cc0000', fontWeight: 'bold' }}>
              Coordenadas: {item.latitude ? `Lat: ${item.latitude}, Lon: ${item.longitude}` : 'Ainda não definidas'}
            </p>
          </div>
          <div>
            <button onClick={() => handleSingleTest(item)} style={{ padding: '8px 12px' }}>
              Testar Este CEP
            </button>
          </div>
        </div>
      ))}
    </>
  );
}