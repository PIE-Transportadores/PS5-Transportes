"use client"
import { useEffect, useState } from "react"
import ModalServico from "@/app/componetes/cadastro_servico/modal_servico"
import { buscarServicos } from "@/app/api/servico/utils/BuscarServico"
import Popup_serv from "./pop-serv"
import Form_Serv_Edit from "./Form_serv_Edit"
import { useRouter } from 'next/navigation';

// --- ATUALIZADO ---
// A interface agora inclui um array para os funcionários
interface Servico {
    id: number
    servico: string
    destino: {
        id: number;
        destino: string
    } | null;
    dataInicio: string
    dataFim: string
    // A propriedade 'funcionarios' é um array de objetos.
    // Cada objeto representa a relação e contém os dados do funcionário.
    funcionarios: {
        funcionario: {
            id: number;
            nome: string;
        }
    }[];
}

const formatarData = (dataString: string) => {
    if (!dataString) return 'N/A';
    try {
        const data = new Date(dataString);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};

export default function Viws_serv({ isOpen_serv, onClose_serv }: any) {
    const router = useRouter();
    const [servicos, setServicos] = useState<Servico[]>([])
    const [isPopup, setIspopup] = useState(false)
    const [isOpen_serv1, setIsOpen_serv1] = useState(isOpen_serv)
    const [idEdicao, setIdEdicao] = useState<number | null>(null)
    const [mostrarEditar, setMostrarEditar] = useState(false)

    useEffect(() => {
        setIsOpen_serv1(isOpen_serv)
    }, [isOpen_serv])

    async function carregar() {
        const data = await buscarServicos()
        setServicos(data)
    }

    useEffect(() => {
        carregar()
    }, [])

    const handleVerificarRota = (servicoId: number) => {
        router.push(`/tela_rotas/${servicoId}`);
    };

    const delete_servico = async (id: number) => {
        const confirmado = window.confirm("Tem certeza que deseja excluir este serviço?");
        if (!confirmado) return;
        await fetch(`/api/servicos/${id}`, {
            method: "DELETE"
        })
        carregar()
    }

    return (
        <div>
            <Popup_serv isOpen_serv={isOpen_serv1} onClose_serv={() => setIsOpen_serv1(false)}>
                <div className="overflow-y-auto max-h-[700px] rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white mb-6">Serviços Cadastrados</h1>
                        <div className="flex items-center gap-10">
                            <button onClick={carregar}>
                                <svg className="w-[45px] h-[45px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                                </svg>
                            </button>
                            <button onClick={() => { setIspopup(true); setIsOpen_serv1(false); }} className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                                + Cadastrar
                            </button>
                            <button className="text-gray-400 hover:text-white text-xl" onClick={() => { onClose_serv() }}>
                                ×
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full text-sm text-left text-gray-300">
                            <thead className="uppercase text-xs bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Serviço</th>
                                    <th className="px-6 py-3">Destino</th>
                                    {/* --- NOVO: Coluna para Funcionários --- */}
                                    <th className="px-6 py-3">Funcionários</th>
                                    <th className="px-6 py-3">Data Início</th>
                                    <th className="px-6 py-3">Data Fim</th>
                                    <th className="px-6 py-3 text-center" colSpan={3}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicos.map((serv) => (
                                    <tr key={serv.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="px-6 py-4 font-medium text-white">{serv.servico}</td>
                                        <td className="px-6 py-4">{serv.destino?.destino || "N/A"}</td>
                                        {/* --- NOVO: Célula que renderiza os funcionários --- */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {serv.funcionarios.length > 0 ? (
                                                    serv.funcionarios.map(rel => (
                                                        <span key={rel.funcionario.id} className="bg-blue-900/50 text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full">
                                                            {rel.funcionario.nome}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500">Nenhum</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{formatarData(serv.dataInicio)}</td>
                                        <td className="px-6 py-4">{formatarData(serv.dataFim)}</td>
                                        <td className="px-3 py-4">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs" onClick={() => { setIdEdicao(serv.id); setMostrarEditar(true); setIsOpen_serv1(false); }}>
                                                Editar
                                            </button>
                                        </td>
                                        <td className="px-3 py-4">
                                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs" onClick={() => delete_servico(serv.id)}>
                                                Excluir
                                            </button>
                                        </td>
                                        <td className="px-3 py-4">
                                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs" onClick={() => handleVerificarRota(serv.id)}>
                                                Verificar Rota
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Popup_serv>

            <div className="flex-1 flex items-center justify-center relative">
                <ModalServico
                    isOpen={isPopup}
                    onClose={() => setIspopup(false)}
                    reabrirlista={() => setIsOpen_serv1(true)}
                />
            </div>

            <div className="flex-1 flex items-center justify-center relative">
                {idEdicao !== null && (
                    <Form_Serv_Edit
                        id={idEdicao}
                        isOpen={mostrarEditar}
                        onClose={() => setMostrarEditar(false)}
                        reabrirlista={() => setIsOpen_serv1(true)}
                    />
                )}
            </div>
        </div>
    )
}
