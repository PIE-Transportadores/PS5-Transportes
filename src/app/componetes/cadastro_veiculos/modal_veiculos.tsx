'use client'

import '@/app/globals.css'
import CriarVeic from '@/action/service/veic-service'
import Popup from "@/modal/modal_cadastro_funcionario/popup"
import React, { useActionState, useState, useTransition } from 'react'


const inicializarForm = {sucesso: false}

export default function ModalVeiculos({ isOpen, onClose }: any) {

    interface ErrosForm {
    placa?: string
    garagem?: string
    marca?: string
    ano?: string
    tipo?: string
    }

    const [erros, setErros] = useState<ErrosForm>({})
    const [isPending, startTransition] = useTransition()
    const [state,formAction] = useActionState(CriarVeic,inicializarForm)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const placa = formData.get('placa')?.toString().trim() ?? ""
        const garagem = formData.get('garagem')?.toString().trim() ?? ""
        const marca = formData.get('marca')?.toString().trim() ?? ""
        const ano = formData.get('ano')?.toString().trim() ?? ""
        const tipo = formData.get('tipo')?.toString().trim() ?? ""

        const newErrors: ErrosForm = {}

        if (!placa) newErrors.placa = "Placa é obrigatória"
        if (!garagem) newErrors.garagem = "Garagen é obrigatório"
        if (!marca) newErrors.marca = "Marca é obrigatória"
        if (!ano) newErrors.ano = "Ano é obrigatório"
        if (!tipo) newErrors.tipo = "Tipo de veículo é obrigatório"

        if (Object.keys(newErrors).length > 0) {
            setErros(newErrors)
            return
        }

        setErros({})
        // Aqui você poderá enviar os dados para o backend no futuro
        alert("Dados do veículo enviados com sucesso!")
        
        startTransition(()=>{
            formAction(formData)
            alert("Formulario Enviado")
           })
    }

    return (
        <div className="modal_veiculos">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[550px]">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Cadastrar Veiculos</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Placa</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="placa" placeholder="Placa do Veículo" />
                            {erros.placa && <p className="erro">{erros.placa}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Garagem</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="garagem" placeholder="Garagem" />
                            {erros.garagem && <p className="erro">{erros.garagem}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Marca</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="marca" placeholder="Marca" />
                            {erros.marca && <p className="erro">{erros.marca}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Ano</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" name="ano" placeholder="Ano de Fabricação" />
                            {erros.ano && <p className="erro">{erros.ano}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Tipo</label>
                            <select className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" name="tipo">
                                <option value="">Selecione o tipo</option>
                                <option value="Carro">Carro</option>
                                <option value="Caminhão">Caminhão</option>
                                <option value="Moto">Moto</option>
                                <option value="Van">Van</option>
                            </select>
                            {erros.tipo && <p className="erro">{erros.tipo}</p>}
                        </div>

                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition" type="submit" disabled={isPending}>{isPending?"Salvando":"Salvar Veiculo"}</button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}
