'use client'
import { useEffect, useState } from "react";
import { Popup_serv_editar } from "./pop-serv";
import { buscarFuncionarios } from "@/app/api/funcionarios/utils/BuscarFuncionario";
import { buscarDestinos } from "@/app/api/destinos/utils/buscarDestinos"; // Garanta que esta função exista

// Interfaces para os tipos de dados que vamos usar
interface Props {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    reabrirlista: () => void;
}

interface Destino {
    id: number;
    destino: string;
}

interface Funcionario {
    id: number;
    nome: string;
}

interface FormState {
    servico: string;
    destinoId: number | string;
    dataInicio: string;
    dataFim: string;
    funcionarioIds: number[];
}

// Função para formatar a data que vem do banco para o input type="date"
const formatarDataParaInput = (dataString: string): string => {
    if (!dataString) return "";
    try {
        const data = new Date(dataString);
        // Retorna a data no formato AAAA-MM-DD
        return data.toISOString().split('T')[0];
    } catch {
        return "";
    }
}

export default function Form_Serv_Edit({ id, isOpen, onClose, reabrirlista }: Props) {
    const [isPending, setIsPending] = useState(false);
    const [todosDestinos, setTodosDestinos] = useState<Destino[]>([]);
    const [todosFuncionarios, setTodosFuncionarios] = useState<Funcionario[]>([]);
    const [form, setForm] = useState<FormState>({
        servico: "",
        destinoId: "",
        dataInicio: "",
        dataFim: "",
        funcionarioIds: [],
    });

    // Efeito para carregar as listas de destinos e funcionários uma vez
    useEffect(() => {
        async function carregarDadosDeApoio() {
            const destinosData = await buscarDestinos();
            const funcionariosData = await buscarFuncionarios();
            setTodosDestinos(destinosData);
            setTodosFuncionarios(funcionariosData);
        }
        carregarDadosDeApoio();
    }, []);

    // Efeito para carregar os dados do serviço a ser editado
    useEffect(() => {
        if (id && isOpen) {
            async function fetchData() {
                try {
                    const res = await fetch(`/api/servico/${id}`);
                    if (!res.ok) {
                        // --- ATUALIZADO --- Adiciona mais detalhes ao erro
                        const errorBody = await res.text();
                        console.error("API Error Response:", errorBody);
                        throw new Error(`Falha ao carregar dados do serviço. Status: ${res.status}`);
                    }
                    
                    const data = await res.json();
                    
                    setForm({
                        servico: data.servico || "",
                        destinoId: data.destinoId || "",
                        dataInicio: formatarDataParaInput(data.dataInicio),
                        dataFim: formatarDataParaInput(data.dataFim),
                        funcionarioIds: data.funcionarios?.map((rel: any) => rel.funcionario.id) || []
                    });
                } catch (error) {
                    console.error("Erro ao buscar serviço para edição:", error);
                    alert("Erro ao carregar dados. Verifique o console para mais detalhes.");
                    onClose();
                }
            }
            fetchData();
        }
    }, [id, isOpen]);

    // Manipulador para atualizar o estado do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Manipulador para os checkboxes de funcionários
    const handleFuncionarioChange = (funcionarioId: number) => {
        setForm(prev => {
            const newFuncionarioIds = prev.funcionarioIds.includes(funcionarioId)
                ? prev.funcionarioIds.filter(id => id !== funcionarioId)
                : [...prev.funcionarioIds, funcionarioId];
            return { ...prev, funcionarioIds: newFuncionarioIds };
        });
    };

    // Manipulador para o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        const payload = {
            ...form,
            destinoId: Number(form.destinoId) || null,
        };

        try {
            const res = await fetch(`/api/servicos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Falha ao atualizar o serviço.");

            alert("Serviço atualizado com sucesso!");
            onClose();
            reabrirlista();
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar o serviço.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Popup_serv_editar isOpen={isOpen} onClose={onClose}>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Editar Serviço</h2>
                    <button onClick={() => { onClose(); reabrirlista(); }} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-x-6 space-y-4 md:space-y-0">
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">Nome do Serviço</label>
                            <input type="text" name="servico" value={form.servico} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Data de Início</label>
                            <input type="date" name="dataInicio" value={form.dataInicio} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Data de Fim</label>
                            <input type="date" name="dataFim" value={form.dataFim} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                        </div>
                        <div className="md:col-span-2 pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Destino</label>
                            <select name="destinoId" value={form.destinoId} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600">
                                <option value="">Selecione um destino</option>
                                {todosDestinos.map((dest) => (
                                    <option key={dest.id} value={dest.id}>{dest.destino}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2 pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Equipe de Funcionários</label>
                            <div className="max-h-40 overflow-y-auto bg-gray-700/50 p-3 rounded border border-gray-600 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {todosFuncionarios.map((func) => (
                                    <label key={func.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600 transition cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.funcionarioIds.includes(func.id)}
                                            onChange={() => handleFuncionarioChange(func.id)}
                                            className="form-checkbox h-4 w-4 bg-gray-900 border-gray-600 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>{func.nome}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <button type="submit" disabled={isPending} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition disabled:bg-gray-500">
                            {isPending ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </Popup_serv_editar>
    );
}
