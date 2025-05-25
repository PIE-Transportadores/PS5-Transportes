
'use client'
import './gerente.css'

import { useState } from 'react'


import Viws_func from './Gerenciamento-funcionario/page'

export default  function Tela_gerenciamento(){

    
    const [isOpen_func,setIsopen] = useState(false)
    console.log("O valor da 1ª pagina é ",isOpen_func)

    
    return (
    <div className="flex h-screen bg-gray-200">
        <div className="w-1/5 bg-gray-300 p-4 border-r border-gray-400 flex flex-col items-center">
            <h1 className="text-lg font-bold mb-6">Menu</h1>

            <button
                onClick={() => setIsopen(true)}
                className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
            >
                Funcionário
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
            <button className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition">
                Cadastro de Destino
            </button>
        </div>
        
        
          
        <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
            <Viws_func isOpen_func = {isOpen_func} onClose_func = {()=> setIsopen(false)}/>   
        </div>
    </div>
    );

}