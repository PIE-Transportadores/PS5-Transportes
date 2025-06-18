// Caminho do arquivo: /componentes/Gerenciamento-alojamento/Viws_aloj.tsx (ou similar)

"use client"
import { useEffect, useState } from "react";
import Popup_func from "./pop-func";
import ModalAlojamento from "../../componetes/cadastro_alojamento/modal_alojamento";
import Form_Aloj_Edit from "./Form_Aloj_Edit";

async function buscarAlojamentos() {
    try {
        const res = await fetch('/api/alojamentos');
        if (!res.ok) {
            console.error("API retornou um erro ao buscar alojamentos");
            return [];
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao tentar buscar alojamentos:", error);
        return [];
    }
}

interface Alojamento {
    id: number;
    alojamento: string;
    bairro: string;
    rua: string;
    numero: number;
    cep: number;
}

export default function Viws_aloj({ isOpen_aloj, onClose_aloj }: any) {

    const [alojamentos, setAlojamentos] = useState<Alojamento[]>([]);
    const [isPopupCadastro, setIsPopupCadastro] = useState(false);
    const [idEdicao, setIdEdicao] = useState<number | null>(null);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [modalCadastroKey, setModalCadastroKey] = useState(0);

    async function carregarAlojamentos() {
        const data = await buscarAlojamentos();
        setAlojamentos(data);
    }

    useEffect(() => {
        if (isOpen_aloj) {
            carregarAlojamentos();
        }
    }, [isOpen_aloj]);

    const delete_alojamento = async (id: number) => {
        const confirmado = window.confirm("Tem certeza que deseja excluir este alojamento?");
        if (!confirmado) return;

        const res = await fetch(`/api/alojamentos/${id}`, { method: "DELETE" });
        if (res.ok) {
            carregarAlojamentos();
        }
    };

    const handleAbrirModalCadastro = () => {
        setIsPopupCadastro(true);
    };

    const handleFecharModalCadastro = () => {
        setIsPopupCadastro(false);
        setModalCadastroKey(prevKey => prevKey + 1);
        carregarAlojamentos();
    };

    // Não renderiza nada se o container principal não estiver aberto
    if (!isOpen_aloj) return null;

    return (
        <div>
            <Popup_func isOpen_func={isOpen_aloj} onClose_func={onClose_aloj}>
                {/* O conteúdo abaixo será centralizado pelo Popup_func */}
                <div className="flex flex-col items-center justify-center w-full h-full">

                    {/* ================================================================= */}
                    {/* A MUDANÇA PRINCIPAL ESTÁ AQUI                                    */}
                    {/* A lista só será exibida se NENHUM modal estiver aberto.          */}
                    {/* ================================================================= */}
                    {!isPopupCadastro && !mostrarEditar && (
                        <div className="w-full max-w-4xl rounded-lg p-6 bg-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-white">Alojamentos Cadastrados</h1>
                                <div className="flex items-center gap-4">
                                    <button onClick={carregarAlojamentos}>
                                        <svg className="w-[45px] h-[45px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleAbrirModalCadastro}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                                    >
                                        + Cadastrar Alojamento
                                    </button>
                                    <button className="text-gray-400 hover:text-white text-xl" onClick={onClose_aloj}>
                                        ×
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-lg">
                                {/* ... sua tabela ... */}
                                <table className="min-w-full text-sm text-left text-gray-300">
                                    <thead className="uppercase text-xs bg-gray-800 text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Nome</th>
                                            <th className="px-6 py-3">Bairro</th>
                                            <th className="px-6 py-3">Rua</th>
                                            <th className="px-6 py-3">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alojamentos.map((aloj) => (
                                            <tr key={aloj.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition">
                                                <td className="px-6 py-4">{aloj.alojamento}</td>
                                                <td className="px-6 py-4">{aloj.bairro}</td>
                                                <td className="px-6 py-4">{aloj.rua}</td>
                                                <td className="px-3 py-4 space-x-2">
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                                                        onClick={() => { setIdEdicao(aloj.id); setMostrarEditar(true); }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                                        onClick={() => delete_alojamento(aloj.id)}
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
                    )}

                    {/* Os modais agora são renderizados no mesmo nível da lista. */}
                    {/* Quando a lista some, eles aparecem sozinhos no container. */}
                    <ModalAlojamento
                        key={modalCadastroKey}
                        isOpen={isPopupCadastro}
                        onClose={handleFecharModalCadastro}
                    />

                    {idEdicao !== null && (
                        <Form_Aloj_Edit
                            id={idEdicao}
                            isOpen={mostrarEditar}
                            onClose={() => { setMostrarEditar(false); carregarAlojamentos(); }}
                        />
                    )}
                </div>
            </Popup_func>
        </div>
    );
}