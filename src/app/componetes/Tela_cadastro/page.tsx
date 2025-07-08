// Tela Cadastro

import Link from 'next/link'
import { criarConta } from '@/action/auth-action'

export default function Tela_cadastro (){
  return(
    // Fundo azul escuro que ocupa a tela inteira e centraliza o conteúdo
    <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center p-4">
      
      {/* Card do formulário */}
      <div className="w-full max-w-md bg-blue-800 p-8 rounded-xl shadow-2xl">
        <form className="space-y-4" action={criarConta}>
          <h1 className="text-3xl font-bold text-center mb-4">Cadastro de Usuário</h1>

          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
            <input id='nome' name='nome' type="text" placeholder="Seu nome completo"
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" required/>
          </div>
          
          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
            <input id='email' name='email' type="email" placeholder="seu@email.com"
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" required/>
          </div>
          
          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <input id="password" name="password" type="password" placeholder="Crie uma senha forte"
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" required/>
          </div>

          {/* Data de Nascimento */}
          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-300 mb-1">Data de Nascimento</label>
            <input id='data' name='data' type="date"
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" required/>
          </div>
          
          {/* Sexo */}
          <div>
            <label htmlFor="sexo" className="block text-sm font-medium text-gray-300 mb-1">Sexo</label>
            <select name="sexo" id="sexo"
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition">
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>

          {/* Botão Registrar */}
          <button type="submit" 
            className='w-full bg-yellow-400 text-blue-900 font-bold py-3 rounded-md hover:bg-yellow-300 transition duration-300 text-lg mt-6' >
              Registrar
          </button>
          
          {/* Link para Login */}
          <div className="text-center text-gray-300 pt-2">
            <p>Já possui uma conta?{' '}
              <Link href='/componetes/Tela_login' className="font-semibold text-yellow-400 hover:underline">
                Faça Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}