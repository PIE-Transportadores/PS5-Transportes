'use client'
import Popup from "@/modal/modal_cadastro_alojamento/popup"
import React, { useActionState } from 'react'
import CriarAloj from "@/action/service/aloj-service";
import { useEffect, useState, useTransition } from "react";

const inicializarForm = { sucesso: false }

export default function ModalAlojamento({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const [state, formAction] = useActionState(CriarAloj, inicializarForm)
    const [isPending, startTransition] = useTransition()

    interface ErrosForm {
        nome?: string
        bairro?: string
        rua?: string
        numero?: string
        cep?: string
        capacidade?: string // Adicionado o campo capacidade
    }

    const [erros, setErrors] = useState<ErrosForm>({})

    useEffect(() => {
        if (state.sucesso && isOpen) {
            onClose()
        } else {
            state.sucesso = false
        }

    }, [state.sucesso, onClose, isOpen])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const nome = formData.get('nome')?.toString().trim() ?? ""
        const bairro = formData.get('bairro')?.toString().trim() ?? ""
        const numero = formData.get('numero')?.toString().trim() ?? ""
        const cep = formData.get('cep')?.toString().trim() ?? ""
        const rua = formData.get('rua')?.toString().trim() ?? ""
        const capacidade = formData.get('capacidade')?.toString().trim() ?? "" // Adicionado a obtenção do valor

        const newErrors: ErrosForm = {}

        if (!nome) newErrors.nome = "Nome é obrigatório"
        if (!bairro) newErrors.bairro = "Bairro é obrigatório"
        if (!numero) newErrors.numero = "Número é obrigatório"
        if (!cep) newErrors.cep = "CEP é obrigatório"
        if (!rua) newErrors.rua = "Rua é obrigatória"
        if (!capacidade) newErrors.capacidade = "Capacidade é obrigatória" // Adicionada a validação

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})

        startTransition(() => {
            formAction(formData)
            alert("Formulário Enviado")
        })
    }

    return (
        <div className="modal_aloj">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[auto]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-sans text-white">Cadastro de Alojamento</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className="block text-sm mb-1">Nome</label>
                            <input className=" w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="nome"
                                placeholder="Alojamento"
                            />
                            {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
                        </div>

                        {/* Novo campo Capacidade */}
                        <div className="">
                            <label className="block text-sm mb-1">Capacidade</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                name="capacidade"
                                placeholder="Capacidade"
                                min="1"
                            />
                            {erros.capacidade && <p className="text-red-400 text-sm mt-1">{erros.capacidade}</p>}
                        </div>

                        <div className="">
                            <label className="block text-sm mb-1">Bairro</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="bairro"
                                placeholder="Bairro"
                            />
                            {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Rua</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rua"
                                type="text"
                                name="rua" />

                        </div>
                        {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua}</p>}
                        <div className="">
                            <label className="block text-sm mb-1">Número:</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                name="numero"
                                placeholder="Número"
                                min="1"
                            />
                            {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">CEP:</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3.5"
                                placeholder="CEP"
                                name="cep"
                                type="text"
                                inputMode="numeric"
                                maxLength={8} />
                        </div>
                        {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep}</p>}

                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Salvando...' : 'Cadastrar'}
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}