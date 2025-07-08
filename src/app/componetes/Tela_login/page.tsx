// Tela Login
import Link from 'next/link'

import { fazer_login } from '@/action/auth-action'

export default function Form(){
  return (
    // Fundo azul escuro que ocupa a tela inteira e centraliza o conteúdo
    <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center p-4">
      
      {/* Card do formulário */}
      <div className="w-full max-w-md bg-blue-800 p-8 rounded-xl shadow-2xl">

        <form action={fazer_login} className="space-y-6">
          <h1 className="text-3xl font-bold text-center mb-6">Bem-vindo</h1>

          {/* Campo de E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Usuário</label>
            <input 
              id='email' 
              name='email' 
              placeholder="seu@email.com" 
              type="email" 
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <input 
              id='senha' 
              name='senha' 
              placeholder="********" 
              type="password"
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Botão de Login */}
          <button 
            type="submit" 
            className="w-full bg-yellow-400 text-blue-900 font-bold py-3 rounded-md hover:bg-yellow-300 transition duration-300 text-lg"
          >
            Login
          </button>

          {/* Link para Cadastro */}
         
        </form>
        
      </div>
    </div>
  )
}