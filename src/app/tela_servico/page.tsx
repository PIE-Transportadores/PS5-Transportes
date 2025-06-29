
import ModalServico from "../componetes/cadastro_servico/modal_servico"
import { useState } from "react"

export default function Tela_servico(){

    const [isOpen_servico,setIsopen] = useState(false)

    return(
      <div className="flex h-screen bg-gray-200">
        <div className="w-1/5 bg-gray-300 p-4 border-r border-gray-400 flex flex-col items-center">
            <h1 className="text-lg font-bold mb-6">Gerenciamento de Serviços</h1>

            <button
            className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
            onClick={() => setIsopen(true)}
            >
            Cadastrar Serviços
            </button>

            <button
            className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
            >
            Cadastrar Ordem de Serviço
            </button>
        </div>

        <div className="flex-1 p-6">
            
            <h2 className="text-2xl font-semibold text-gray-700">Bem-vindo ao painel!</h2>
            <ModalServico isOpen = {isOpen_servico} onClose = {()=>setIsopen(false)}/>
        </div>
        </div>

    )
}