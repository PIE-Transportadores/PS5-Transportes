"use client"
import { useEffect, useState } from "react"
import Popup_destino from "@/modal/modal_cadastro_destinos/popup"
import ModalDestinos from "@/app/componetes/cadastro_destinos/modal_destinos"
import Form_Destino_Edit from "./Form_Destino_Edit"

interface Destino {
    id: number
    destino: string
    rua: string
    bairro: string
    cidade: string
    estado: string
    numero: number
    cep: string
    latitude: number
    longitude: number
}

// --- NOVO: Função para formatar o CEP para exibição ---
const formatarCep = (cep: string) => {
    // Se o CEP não tiver 8 dígitos, retorna como está
    if (!cep || cep.replace(/\D/g, '').length !== 8) {
        return cep;
    }
    // Formata para o padrão XXXXX-XXX
    const cepLimpo = cep.replace(/\D/g, '');
    return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;
};

export default function Viws_destino({ isOpen_dest, onClose_dest }: any) {
    const [destinos, setDestinos] = useState<Destino[]>([])
    const [isPopup, setIspopup] = useState(false)
    const [isOpen_dest1, setIsOpen_dest1] = useState(isOpen_dest)
    const [idEdicao, setIdEdicao] = useState<number | null>(null)
    const [mostrarEditar, setMostrarEditar] = useState(false)

    useEffect(() => {
        setIsOpen_dest1(isOpen_dest)
    }, [isOpen_dest])

    async function carregar() {
        try {
            const res = await fetch('/api/destinos')
            if (!res.ok) throw new Error('Erro ao buscar destinos')
            const data = await res.json()
            setDestinos(data)
        } catch (error) {
            console.error(error);
            // Opcional: Adicionar um alerta para o usuário
            // alert("Não foi possível carregar a lista de destinos.");
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    const delete_destino = async (id: number) => {
        const confirmado = window.confirm("Tem certeza que deseja excluir este destino?");
        if (!confirmado) return;
        await fetch(`/api/destinos/${id}`, { method: "DELETE" })
        carregar()
    }

    return (
        <div>
            <Popup_destino isOpen={isOpen_dest1} onClose={() => setIsOpen_dest1(false)}>
                <div className="overflow-y-auto max-h-[700px] rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white mb-6">Destinos Cadastrados</h1>
                        <div className="flex items-center gap-10">
                            <button onClick={carregar}>
                                <svg className="w-[45px] h-[45px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/>
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    setIspopup(true)
                                    setIsOpen_dest1(false)
                                }}
                                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                            >
                                + Cadastrar
                            </button>
                            <button className="text-gray-400 hover:text-white text-xl" onClick={() => { onClose_dest() }}>
                                ×
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full text-sm text-left text-gray-300">
                            <thead className="uppercase text-xs bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Destino</th>
                                    <th className="px-6 py-3">Rua</th>
                                    <th className="px-6 py-3">Bairro</th>
                                    <th className="px-6 py-3">Cidade</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3">Número</th>
                                    <th className="px-6 py-3">CEP</th>
                                    <th className="px-6 py-3 text-center" colSpan={2}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(destinos) && destinos.map((dest) => (
                                    <tr key={dest.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="px-6 py-4">{dest.destino}</td>
                                        <td className="px-6 py-4">{dest.rua}</td>
                                        <td className="px-6 py-4">{dest.bairro}</td>
                                        <td className="px-6 py-4">{dest.cidade}</td>
                                        <td className="px-6 py-4">{dest.estado}</td>
                                        <td className="px-6 py-4">{dest.numero}</td>
                                        {/* --- ATUALIZADO: Aplicando a formatação do CEP --- */}
                                        <td className="px-6 py-4">{formatarCep(dest.cep)}</td>
                                        <td className="px-3 py-4">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                                                onClick={() => {
                                                    setIdEdicao(dest.id)
                                                    setMostrarEditar(true)
                                                    setIsOpen_dest1(false)
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                        <td className="px-3 py-4">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                                onClick={() => delete_destino(dest.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Popup_destino>
            <div className="flex-1 flex items-center justify-center relative">
                <ModalDestinos
                    isOpen={isPopup}
                    onClose={() => setIspopup(false)}
                    reabrirlista={() => setIsOpen_dest1(true)}
                />
            </div>
            <div className="flex-1 flex items-center justify-center relative">
                {idEdicao !== null && (
                    <Form_Destino_Edit
                        id={idEdicao}
                        isOpen={mostrarEditar}
                        onClose={() => setMostrarEditar(false)}
                        reabrirlista={() => setIsOpen_dest1(true)}
                    />
                )}
            </div>
        </div>
    )
}
