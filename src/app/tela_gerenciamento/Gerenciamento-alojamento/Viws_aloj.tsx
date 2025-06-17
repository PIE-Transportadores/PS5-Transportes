
"use client"
import { useEffect, useState } from "react";
import Popup_func from "./pop-func"; // Reutilizando o popup
import ModalAlojamento from "../../componetes/cadastro_alojamento/modal_alojamento"; // Modal de CRIAÇÃO que você já tinha
import Form_Aloj_Edit from "./Form_Aloj_Edit"; // O novo modal de EDIÇÃO


async function buscarAlojamentos() {
    const res = await fetch('/api/alojamentos'); // Rota da API que lista todos os alojamentos
    const data = await res.json();
    return data;
}

interface Alojamento {
    id: number;
    nome: string;
    bairro: string;
    rua: string;
    numero: string;
    cep: string;
}

export default function Viws_aloj({ isOpen_aloj, onClose_aloj }: any) {

    const [alojamentos, setAlojamentos] = useState<Alojamento[]>([]);
    const [isPopupCadastro, setIsPopupCadastro] = useState(false); // Para o modal de cadastro
    const [isOpen_aloj1, setIsOpen_aloj1] = useState(isOpen_aloj); // Controle de visibilidade da lista
    const [idEdicao, setIdEdicao] = useState<number | null>(null); // ID para edição
    const [mostrarEditar, setMostrarEditar] = useState(false); // Para o modal de edição

    useEffect(() => {
        setIsOpen_aloj1(isOpen_aloj);
    }, [isOpen_aloj]);

    async function carregarAlojamentos() {
        const data = await buscarAlojamentos();
        setAlojamentos(data);
    }

    useEffect(() => {
        if (isOpen_aloj1) {
            carregarAlojamentos();
        }
    }, [isOpen_aloj1]); // Recarrega quando a lista fica visível

    const delete_alojamento = async (id: number) => {
        const confirmado = window.confirm("Tem certeza que deseja excluir este alojamento?");
        if (!confirmado) return;

        const res = await fetch(`/api/alojamentos/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            carregarAlojamentos(); // Recarrega a lista após a exclusão
        }
    }

    return (
        <div>
            <Popup_func isOpen_func={isOpen_aloj1} onClose_func={() => setIsOpen_aloj1(false)}>
                <div className="overflow-y-auto max-h-[700px] rounded-lg p-6 bg-gray-900">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Alojamentos Cadastrados</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={carregarAlojamentos}>
                                <svg className="w-[45px] h-[45px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    setIsPopupCadastro(true);
                                    setIsOpen_aloj1(false);
                                }}
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
                        <table className="min-w-full text-sm text-left text-gray-300">
                            <thead className="uppercase text-xs bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Nome</th>
                                    <th className="px-6 py-3">Bairro</th>
                                    <th className="px-6 py-3">Rua</th>
                                    <th className="px-6 py-3">Número</th>
                                    <th className="px-6 py-3">CEP</th>
                                    <th className="px-6 py-3 text-center" colSpan={2}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alojamentos.map((aloj) => (
                                    <tr key={aloj.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="px-6 py-4">{aloj.nome}</td>
                                        <td className="px-6 py-4">{aloj.bairro}</td>
                                        <td className="px-6 py-4">{aloj.rua}</td>
                                        <td className="px-6 py-4">{aloj.numero}</td>
                                        <td className="px-6 py-4">{aloj.cep}</td>
                                        <td className="px-3 py-4">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                                                onClick={() => {
                                                    setIdEdicao(aloj.id);
                                                    setMostrarEditar(true);
                                                    setIsOpen_aloj1(false);
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                        <td className="px-3 py-4">
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
            </Popup_func>

            <ModalAlojamento
                isOpen={isPopupCadastro}
                onClose={() => setIsPopupCadastro(false)}
            />

            {idEdicao !== null && (
                <Form_Aloj_Edit
                    id={idEdicao}
                    isOpen={mostrarEditar}
                    onClose={() => setMostrarEditar(false)}
                    reabrirlista={() => setIsOpen_aloj1(true)}
                />
            )}
        </div>
    );
}