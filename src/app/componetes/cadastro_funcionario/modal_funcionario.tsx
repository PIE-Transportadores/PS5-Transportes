'use client'
import Popup from "@/modal/modal_cadastro_funcionario/popup"
import CriarFunc from "@/action/service/func-service";
import React, { useActionState } from 'react'
import { useEffect, useState, useTransition } from "react";
import BuscarAlojamento from "@/app/api/funcionarios/utils/BuscarAlojamento";

const inicializarForm = { sucesso: false, message: "" }

export default function ModalFuncionario({ isOpen, onClose, reabrirlista }: any) {

    const [state, formAction] = useActionState(CriarFunc, inicializarForm)
    const [isPending, startTransition] = useTransition()
    const [cpf, setCpf] = useState("")
    const [erros, setErrors] = useState<any>({})

    type Alojamento = {
        id: number;
        alojamento: string;
    }

    const [alojamentos, setAlojamentos] = useState<Alojamento[]>([])

    // Carrega os alojamentos disponíveis quando o componente monta
    useEffect(() => {
        async function carregarAlojamento() {
            const data = await BuscarAlojamento()
            setAlojamentos(data)
        }
        carregarAlojamento()
    }, [])


    // Fecha o modal e limpa o formulário em caso de sucesso
    useEffect(() => {
        if (state.sucesso && isOpen) {
            alert("Funcionário cadastrado com sucesso!"); // Pode substituir por um toast/notificação
            onClose();
            reabrirlista();
        } else if (!state.sucesso && state.message) {
            alert(`Erro: ${state.message}`); // Exibe erro do backend
        }
    }, [state, isOpen, onClose, reabrirlista])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        // Validação simples no frontend
        const nome = formData.get('nome')?.toString().trim() ?? ""
        const cpfRaw = formData.get('cpf')?.toString().replace(/\D/g, '') ?? ""
        const turno = formData.get('turno')?.toString().trim() ?? ""
        const alojamentoId = formData.get('alojamentoId')?.valueOf() ?? ""

        const newErrors: any = {}
        if (!nome) newErrors.nome = "Nome é obrigatório"
        if (!turno) newErrors.turno = "Turno é obrigatório"
        if (!alojamentoId) newErrors.alojamento = "Alojamento é obrigatório"
        if (!cpfRaw) newErrors.cpf = "CPF é obrigatório"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setErrors({})

        startTransition(() => {
            formAction(formData)
        })
    }

    function formatarCPF(valor: string) {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14)
    }

    return (
        <div className="modal_func">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Cadastrar Funcionário</h2>
                        <button onClick={() => {
                            onClose()
                            reabrirlista()
                        }}
                            className="text-gray-400 hover:text-white text-xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Digite o nome completo"
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                value={cpf}
                                placeholder="Digite o CPF"
                                onChange={(e) => setCpf(formatarCPF(e.target.value))}
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {erros.cpf && <p className="text-red-400 text-sm mt-1">{erros.cpf}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Turno</label>
                            <select
                                name="turno"
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione o turno</option>
                                <option value="1° Turno">1° Turno</option>
                                <option value="2° Turno">2° Turno</option>
                                <option value="3° Turno">3° Turno</option>
                            </select>
                            {erros.turno && <p className="text-red-400 text-sm mt-1">{erros.turno}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Alojamento</label>
                            {/* /// --- ALTERAÇÃO CRÍTICA AQUI --- /// */}
                            <select
                                name="alojamentoId" // 1. O 'name' agora é 'alojamentoId'
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione um alojamento</option>
                                {alojamentos.map((aloj) => (
                                    <option
                                        key={aloj.id}
                                        value={aloj.id} // 2. O 'value' agora é o ID numérico
                                    >
                                        {aloj.alojamento} {/* O texto continua sendo o nome */}
                                    </option>
                                ))}
                            </select>
                            {erros.alojamento && <p className="text-red-400 text-sm mt-1">{erros.alojamento}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition disabled:bg-gray-500"
                        >
                            {isPending ? 'Salvando...' : '+ Adicionar novo funcionário'}
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}
