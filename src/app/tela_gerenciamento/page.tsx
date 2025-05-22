
'use client'
import './gerente.css'

import { useState } from 'react'

import ModalFuncionario from '../componetes/cadastro_funcionario/modal_funcionario'

export default  function Tela_gerenciamento(){

    const [isPopup,setIspopup] = useState(false)

    console.log("valor:",isPopup)

    return (
    <div className="flex h-screen bg-gray-200">
        <div className="w-1/5 bg-gray-300 p-4 border-r border-gray-400 flex flex-col items-center">
            <h1 className="text-lg font-bold mb-6">Menu</h1>

            <button
                onClick={() => setIspopup(true)}
                className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
            >
                Cadastro de Funcionário
            </button>

            <button className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition">
                Cadastro de Alojamento
            </button>

            <button className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition">
                Cadastro de Veículos
            </button>

            <button className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition">
                Cadastro de Garagem
            </button>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
        <ModalFuncionario isOpen={isPopup} onClose={() => setIspopup(false)} />
        </div>
    </div>
    );

}