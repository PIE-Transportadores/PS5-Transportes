"use client"
import { useEffect, useState } from "react";
import { Popup_func_editar } from "./pop-func";
import BuscarAlojamento from "@/app/api/funcionarios/utils/BuscarAlojamento";

interface Props {
    id: number
    isOpen: boolean
    onClose: () => void
    reabrirlista: () => void
}

type Alojamento = {
    id: number;
    alojamento: string;
}

interface FormState {
    nome: string;
    cpf: string;
    telefone: string;
    cargo: string;
    sexo: string;
    turno: string;
    alojamentoId: number | string;
}

export default function Form_Func_Edit({ id, isOpen, onClose, reabrirlista }: Props) {

    const [isPending, setIsPending] = useState(false);
    const [alojamentos, setAlojamentos] = useState<Alojamento[]>([]);
    const [form, setForm] = useState<FormState>({
        nome: "",
        cpf: "",
        telefone: "",
        cargo: "",
        sexo: "",
        turno: "",
        alojamentoId: ""
    });

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            try {
                const res = await fetch(`/api/funcionarios/${id}`);
                if (!res.ok) throw new Error("Funcionário não encontrado");
                const data = await res.json();
                setForm({ ...data, alojamentoId: data.alojamentoId || "" });
            } catch (error) {
                console.error("Erro ao buscar dados do funcionário:", error);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        async function carregarAlojamentos() {
            const data = await BuscarAlojamento();
            setAlojamentos(data);
        }
        carregarAlojamentos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        try {
            await fetch(`/api/funcionarios/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    alojamentoId: Number(form.alojamentoId) || null
                }),
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
            onClose();
            reabrirlista();
        }
    }

    return (
        <Popup_func_editar isOpen={isOpen} onCLose={onClose}>
            {/* --- ATUALIZADO --- Aumenta a largura máxima do modal */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Editar Funcionário</h2>
                    <button onClick={() => { onClose(); reabrirlista(); }} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* --- ATUALIZADO --- Grid com 2 colunas para o layout */}
                    <div className="grid md:grid-cols-2 md:gap-x-6 space-y-4 md:space-y-0">

                        {/* Nome (ocupa as 2 colunas) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">Nome Completo</label>
                            <input type="text" name="nome" value={form.nome} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* CPF */}
                        <div className="pt-4 md:pt-0">
                            <label className="block text-sm mb-1">CPF</label>
                            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* Telefone */}
                        <div className="pt-4 md:pt-0">
                            <label className="block text-sm mb-1">Telefone</label>
                            <input type="text" name="telefone" value={form.telefone} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* Cargo (ocupa as 2 colunas) */}
                        <div className="md:col-span-2 pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Cargo</label>
                            <input type="text" name="cargo" value={form.cargo} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* Sexo */}
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Sexo</label>
                            <select name="sexo" value={form.sexo} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        {/* Turno */}
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Turno</label>
                            <select name="turno" value={form.turno} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Selecione o turno</option>
                                <option value="1° Turno">1° Turno</option>
                                <option value="2° Turno">2° Turno</option>
                                <option value="3° Turno">3° Turno</option>
                            </select>
                        </div>

                        {/* Alojamento (ocupa as 2 colunas) */}
                        <div className="md:col-span-2 pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Alojamento</label>
                            <select name="alojamentoId" value={form.alojamentoId} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Selecione um alojamento</option>
                                {alojamentos.map((aloj) => (
                                    <option key={aloj.id} value={aloj.id}>{aloj.alojamento}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" disabled={isPending} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition disabled:bg-gray-500">
                            {isPending ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </Popup_func_editar>
    )
}
