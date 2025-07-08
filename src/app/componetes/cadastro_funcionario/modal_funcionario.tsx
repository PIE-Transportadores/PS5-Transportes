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
    const [telefone, setTelefone] = useState("")
    const [erros, setErrors] = useState<any>({})

    type Alojamento = {
        id: number;
        alojamento: string;
    }

    const [alojamentos, setAlojamentos] = useState<Alojamento[]>([])

    useEffect(() => {
        async function carregarAlojamento() {
            const data = await BuscarAlojamento()
            setAlojamentos(data)
        }
        carregarAlojamento()
    }, [])

    useEffect(() => {
        if (state.sucesso && isOpen) {
            alert("Funcionário cadastrado com sucesso!");
            onClose();
            reabrirlista();
        } else if (!state.sucesso && state.message) {
            alert(`Erro: ${state.message}`);
        }
    }, [state, isOpen, onClose, reabrirlista])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        const nome = formData.get('nome')?.toString().trim() ?? ""
        const cpfRaw = formData.get('cpf')?.toString().replace(/\D/g, '') ?? ""
        const turno = formData.get('turno')?.toString().trim() ?? ""
        const alojamentoId = formData.get('alojamentoId')?.valueOf() ?? ""
        const telefoneRaw = formData.get('telefone')?.toString().replace(/\D/g, '') ?? ""
        const cargo = formData.get('cargo')?.toString().trim() ?? ""
        const sexo = formData.get('sexo')?.toString().trim() ?? ""

        const newErrors: any = {}
        if (!nome) newErrors.nome = "Nome é obrigatório"
        if (!cpfRaw) newErrors.cpf = "CPF é obrigatório"
        if (!telefoneRaw || telefoneRaw.length < 10) newErrors.telefone = "Telefone é obrigatório"
        if (!cargo) newErrors.cargo = "Cargo é obrigatório"
        if (!sexo) newErrors.sexo = "Sexo é obrigatório"
        if (!turno) newErrors.turno = "Turno é obrigatório"
        if (!alojamentoId) newErrors.alojamento = "Alojamento é obrigatório"
        
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
        return valor.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14)
    }

    function formatarTelefone(valor: string) {
        return valor.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
    }

    return (
        <div className="modal_func">
            <Popup isOpen={isOpen} onClose={onClose}>
                {/* --- ATUALIZADO --- Aumenta a largura máxima do modal */}
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Cadastrar Novo Funcionário</h2>
                        <button onClick={() => { onClose(); reabrirlista(); }} className="text-gray-400 hover:text-white text-2xl">×</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* --- ATUALIZADO --- Grid com 2 colunas para o layout */}
                        <div className="grid md:grid-cols-2 md:gap-x-6 space-y-4 md:space-y-0">
                            
                            {/* Nome (ocupa as 2 colunas) */}
                            <div className="md:col-span-2">
                                <label className="block text-sm mb-1">Nome Completo</label>
                                <input type="text" name="nome" placeholder="Digite o nome completo" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
                            </div>

                            {/* CPF */}
                            <div className="pt-4 md:pt-0">
                                <label className="block text-sm mb-1">CPF</label>
                                <input type="text" name="cpf" value={cpf} placeholder="000.000.000-00" onChange={(e) => setCpf(formatarCPF(e.target.value))} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                {erros.cpf && <p className="text-red-400 text-sm mt-1">{erros.cpf}</p>}
                            </div>
                            
                            {/* Telefone */}
                            <div className="pt-4 md:pt-0">
                                <label className="block text-sm mb-1">Telefone Pessoal</label>
                                <input type="text" name="telefone" value={telefone} placeholder="(XX) XXXXX-XXXX" onChange={(e) => setTelefone(formatarTelefone(e.target.value))} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                {erros.telefone && <p className="text-red-400 text-sm mt-1">{erros.telefone}</p>}
                            </div>

                            {/* Cargo (ocupa as 2 colunas) */}
                            <div className="md:col-span-2 pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Cargo</label>
                                <input type="text" name="cargo" placeholder="Ex: Operador, Motorista, Supervisor" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                {erros.cargo && <p className="text-red-400 text-sm mt-1">{erros.cargo}</p>}
                            </div>

                            {/* Sexo */}
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Sexo</label>
                                <select name="sexo" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Selecione o sexo</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                {erros.sexo && <p className="text-red-400 text-sm mt-1">{erros.sexo}</p>}
                            </div>

                            {/* Turno */}
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Turno</label>
                                <select name="turno" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Selecione o turno</option>
                                    <option value="1° Turno">1° Turno</option>
                                    <option value="2° Turno">2° Turno</option>
                                    <option value="3° Turno">3° Turno</option>
                                </select>
                                {erros.turno && <p className="text-red-400 text-sm mt-1">{erros.turno}</p>}
                            </div>

                            {/* Alojamento (ocupa as 2 colunas) */}
                            <div className="md:col-span-2 pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Alojamento</label>
                                <select name="alojamentoId" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Selecione um alojamento</option>
                                    {alojamentos.map((aloj) => (
                                        <option key={aloj.id} value={aloj.id}>{aloj.alojamento}</option>
                                    ))}
                                </select>
                                {erros.alojamento && <p className="text-red-400 text-sm mt-1">{erros.alojamento}</p>}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" disabled={isPending} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition disabled:bg-gray-500">
                                {isPending ? 'Salvando...' : '+ Adicionar Novo Funcionário'}
                            </button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    )
}
