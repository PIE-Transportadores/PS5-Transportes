/*
'use client'
import Tela_gerenciamento from "./tela_gerenciamento/page";
import Viws_func from "./tela_gerenciamento/Gerenciamento-funcionario/page";

export default function Home() {
  return (

    <div>
      <Tela_gerenciamento/>
    </div>
    
    
  );
}
*/
'use client'; 

export default function Home() {
  return (
    <div>
      <iframe
        src="/index.html" // Caminho para o arquivo na pasta 'public'
        style={{
          width: '100%',     // Ocupa toda a largura disponível
          height: '100vh',   // Ocupa toda a altura da viewport (tela)
          border: 'none'     // Remove a borda padrão do iframe
        }}
        title="Página Inicial da Transportadora" // Título acessível para o iframe
      />
    </div>
  );
}