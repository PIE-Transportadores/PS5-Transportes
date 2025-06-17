
'use client'
import { useState } from 'react'
import Viws_func from './Gerenciamento-funcionario/page'
import ModalVeiculos from '../componetes/cadastro_veiculos/modal_veiculos'
//import ModalAlojamento from '../componetes/cadastro_alojamento/modal_alojamento'
import Viws_aloj from './Gerenciamento-alojamento/Viws_aloj'

import ModalGaragem from '../componetes/cadastro_garagem/modal_garagem'

export default function Tela_gerenciamento(){

    const [isOpen_func, setIsopen] = useState(false)
    const [isVeiculosPopUp, setIsVeiculosPopUp] = useState(false);
    // const [isAlojPopup, setIsAlojPopup] = useState(false); // ESTE ESTADO NÃO É MAIS NECESSÁRIO AQUI
    const [isGaragemPopup, setIsGaragemPopup] = useState(false);
    
    // 2. ADICIONAR UM NOVO ESTADO PARA CONTROLAR A LISTA DE ALOJAMENTOS
    const [isOpen_aloj, setIsOpen_aloj] = useState(false)

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

            {/* 3. MODIFICAR O ONCLICK DO BOTÃO PARA ABRIR A TELA DE LISTAGEM */}
            <button 
                className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
                onClick={() => setIsOpen_aloj(true)} // MUDANÇA AQUI
            >
                Gerenciar Alojamentos
            </button>

            <button 
                className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
                onClick={() => setIsVeiculosPopUp(true)}
            >
                Cadastro de Veículos
            </button>

            <button 
                className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition"
                onClick={()=>{setIsGaragemPopup(true)}}
            >
                Cadastro de Garagem
            </button>
            <button className="mb-4 w-full px-4 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-800 transition">
                Cadastro de Destino
            </button>
        </div>
        
        <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
            <Viws_func isOpen_func={isOpen_func} onClose_func={() => setIsopen(false)}/>
            
            {/* 4. RENDERIZAR O COMPONENTE DE VISUALIZAÇÃO DE ALOJAMENTO */}
            <Viws_aloj isOpen_aloj={isOpen_aloj} onClose_aloj={() => setIsOpen_aloj(false)} />

            <div className='flex-1 flex items-center justify-center relative'>
                <ModalVeiculos isOpen={isVeiculosPopUp} onClose={() => setIsVeiculosPopUp(false)}/>   
                {/* O ModalAlojamento FOI REMOVIDO DAQUI, POIS Viws_aloj JÁ O CONTROLA */}
                <ModalGaragem isOpen={isGaragemPopup} onClose={() => setIsGaragemPopup(false)}/>
            </div>
        </div>
    </div>
    );
}