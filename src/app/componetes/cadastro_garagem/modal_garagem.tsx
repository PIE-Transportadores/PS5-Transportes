'use client'
import Popup from "@/modal/modal_cadastro_garagem/popup"

import CriarGaragem from "@/action/service/garagem-service"
import { useActionState } from 'react'
import { useEffect} from "react";

const inicializarForm = {sucesso: false}

export default function ModalGaragem({ isOpen, onClose }:any){

    const [state,formAction] = useActionState(CriarGaragem,inicializarForm)
    

        useEffect(()=>{
            if (state.sucesso == true && isOpen == true){
                onClose()
                
            }else{
                state.sucesso = false
            }

        },[state.sucesso,onClose])
    
    return(
        <div className="modal_garagem">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-xl w-[700px] max-w-full">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Cadastro de Garagem</h2>
                    <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold leading-none"
                    aria-label="Fechar modal"
                    >
                    ×
                    </button>
                </div>

                {/* Formulário */}
                <form className="space-y-4" action={formAction}>
                    <div>
                    <label className="block mb-1 font-medium" htmlFor="nome_garagem">Nome Garagem</label>
                    <input
                        id="nome_garagem"
                        name="nome_garagem"
                        type="text"
                        placeholder="Nome Garagem"
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block mb-1 font-medium" htmlFor="rua">Rua</label>
                    <input
                        id="rua"
                        name="rua"
                        type="text"
                        placeholder="Rua"
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block mb-1 font-medium" htmlFor="bairro">Bairro</label>
                    <input
                        id="bairro"
                        name="bairro"
                        type="text"
                        placeholder="Bairro"
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block mb-1 font-medium" htmlFor="numero">Número</label>
                    <input
                        id="numero"
                        name="numero"
                        type="text"
                        placeholder="Número"
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block mb-1 font-medium" htmlFor="cep">CEP</label>
                    <input
                        id="cep"
                        name="cep"
                        type="text"
                        placeholder="CEP"
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
                    >
                    Salvar Garagem
                    </button>
                </form>
                </div>
            </Popup>
        </div>

    )


}