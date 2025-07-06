'use client'
import Popup from "@/modal/modal_cadastro_servico/popup"
import CriarServico from "@/action/service/servico-service"
import React, { useActionState, useEffect, useState, useTransition } from 'react'
import { buscarFuncionarios } from "@/app/api/funcionarios/utils/BuscarFuncionario"
import Select from 'react-select'
import { buscarDestinos } from "@/app/api/destinos/utils/buscarDestinos"
// IMPORTANTE: Crie esta função para buscar as garagens
import { buscarGaragens } from "@/app/api/garagem/utils/BuscarGaragem"

const inicializarForm = { sucesso: false, message: "" }

export default function ModalServico({ isOpen, onClose, reabrirlista }: any) {
    const [state, formAction] = useActionState(CriarServico, inicializarForm)
    const [isPending, startTransition] = useTransition()
    const [erros, setErros] = useState<any>({})

    const [funcionarios, setFuncionarios] = useState<any[]>([])
    const [destinos, setDestinos] = useState<any[]>([])
    const [garagens, setGaragens] = useState<any[]>([]) // Estado para garagens

    // Carrega todos os dados necessários (funcionários, destinos, garagens)
    useEffect(() => {
        const carregarDados = async () => {
            const [listaFunc, listDestinos, listGaragens] = await Promise.all([
                buscarFuncionarios(),
                buscarDestinos(),
                buscarGaragens() // Chama a nova função
            ]);
            setFuncionarios(listaFunc);
            setDestinos(listDestinos);
            setGaragens(listGaragens);
        }
        carregarDados();
    }, []);

    useEffect(() => {
        if (state.sucesso && isOpen) {
            alert("Serviço cadastrado com sucesso!");
            onClose();
            reabrirlista();
        } else if (!state.sucesso && state.message) {
            alert(`Erro: ${state.message}`);
        }
    }, [state, isOpen, onClose, reabrirlista]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        startTransition(() => {
            formAction(formData)
        })
    }
    
    // Estilos para o react-select (sem alteração)
    const customStyles = { /* ... seu código de estilos ... */ };

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Cadastrar Serviço</h2>
                    <button onClick={() => { onClose(); reabrirlista(); }} className="text-gray-400 hover:text-white text-xl">×</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo Nome do Serviço */}
                    <div>
                        <label className="block text-sm mb-1">Nome do Serviço</label>
                        <input type="text" name="servico" placeholder="Ex: Manutenção CCM" className="w-full p-2 bg-gray-700 rounded" />
                    </div>

                    {/* Campo Garagem */}
                    <div>
                        <label className="block text-sm mb-1">Garagem (Ponto de Partida)</label>
                        <select name="garagemId" className="w-full p-2 bg-gray-700 rounded">
                            <option value="">Selecione a garagem</option>
                            {garagens.map((g) => (
                                <option key={g.id} value={g.id}>{g.garagem}</option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Destino */}
                    <div>
                        <label className="block text-sm mb-1">Destino (Ponto Final)</label>
                        <select name="destinoId" className="w-full p-2 bg-gray-700 rounded">
                            <option value="">Selecione o destino</option>
                            {destinos.map((dest) => (
                                <option key={dest.id} value={dest.id}>{dest.destino}</option>
                            ))}
                        </select>
                    </div>

                    {/* Campos de Data */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Data Início</label>
                            <input type="date" name="dataInicio" className="w-full p-2 bg-gray-700 rounded" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Data Fim</label>
                            <input type="date" name="dataFim" className="w-full p-2 bg-gray-700 rounded" />
                        </div>
                    </div>

                    {/* Campo Funcionários */}
                    <div>
                        <label className="block text-sm mb-1">Funcionários (Pontos de Parada)</label>
                        <Select
                            isMulti
                            name="funcionarios"
                            options={funcionarios.map(f => ({ value: f.id, label: f.nome }))}
                            className="basic-multi-select"
                            styles={customStyles}
                            placeholder="Selecione os funcionários..."
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition">
                        {isPending ? 'Salvando...' : '+ Adicionar novo serviço'}
                    </button>
                </form>
            </div>
        </Popup>
    )
}
