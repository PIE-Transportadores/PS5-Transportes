'use client'
import Popup from "@/modal/modal_cadastro_alojamento/popup"
import React, { useActionState } from 'react'
import { useEffect,useState,useTransition} from "react";

export default function ModalAlojamento({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const [isPending, setIsPending] = useState(false)
    
    interface ErrosForm {
        nome?: string
        localizacao?: string
        rua?: string
        numero?: string
        cep?: string
    }
    
    const [erros, setErrors] = useState<ErrosForm>({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)

        const formData = new FormData(e.currentTarget)
        const nome = formData.get('nome')?.toString().trim() ?? ""
        const localizacao = formData.get('localizacao')?.toString().trim() ?? ""
        const numero = formData.get('numero')?.toString().trim() ?? ""
        const cep = formData.get('cep')?.toString().trim() ?? ""
        const rua = formData.get('rua')?.toString().trim() ?? ""

        const newErrors: ErrosForm = {}

        if (!nome) newErrors.nome = "Nome é obrigatório"
        if (!localizacao) newErrors.localizacao = "Bairro é obrigatório"
        if (!numero) newErrors.numero = "Capacidade é obrigatória"
        if (!cep) newErrors.cep = "CEP é obrigatório"
        if (!rua) newErrors.rua = "Rua é obrigatório"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsPending(false)
            return
        }

        setErrors({})

        // Simulação de envio (substituir por ação real depois)
        setTimeout(() => {
            alert("Alojamento cadastrado com sucesso (simulação)")
            setIsPending(false)
            onClose()
        }, 1000)
    }

    return (
        <div className="modal_aloj">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="w-120 h-120 bg-sky-900">
                    <h2 className="font-sans text-white">Cadastro de Alojamento</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <input className=" bg-white m-px p-2.5 rounded-xs"
                                type="text" 
                                name="nome" 
                                placeholder="Alojamento" 
                            />
                            {erros.nome && <p className="erro">{erros.nome}</p>}
                        </div>

                        <div className="">
                            <input className=" bg-white m-px p-2.5 rounded-xs"
                                type="text" 
                                name="localizacao" 
                                placeholder="Bairro" 
                            />
                            {erros.localizacao && <p className="erro">{erros.localizacao}</p>}
                        </div>
                        <div>
                            <input className="bg-white m-px p-2.5 rounded-xs"
                            placeholder="Rua"/>
                        </div>
                        {erros.rua && <p className="erro">{erros.rua}</p>}
                        <div className="">
                            <input className=" bg-white m-px p-2.5 rounded-xs"
                                type="number" 
                                name="numero" 
                                placeholder="Numero" 
                                min="1"
                            />
                            {erros.numero && <p className="erro">{erros.numero}</p>}
                        </div>
                         <div>
                            <input className="bg-white m-px p-2.5 rounded-xs"
                            placeholder="CEP"
                            name="cep"
                            type="text"
                            inputMode="numeric"
                            maxLength={8}/>
                        </div>
                        {erros.cep && <p className="text-red-500">{erros.cep}</p>}
                        <button className="bg-orange-400 py-3 px-7 rounded-4xl" 
                            type="submit" 
                            disabled={isPending}
                        >
                            {isPending ? 'Salvando...' : 'Cadastrar'}
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    )}
