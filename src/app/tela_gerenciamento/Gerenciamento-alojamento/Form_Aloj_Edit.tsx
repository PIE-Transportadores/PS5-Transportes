'use client'

import { useEffect, useState } from "react";
import { Popup_func_editar } from "./pop-func"; 

interface Props {
  id: number
  isOpen: boolean
  onClose: () => void
  //reabrirlista: () => void
}

interface AlojamentoForm {
    nome: string;
    bairro: string;
    rua: string;
    numero: string | number; 
    cep: string | number;
}

export default function Form_Aloj_Edit({ id, isOpen, onClose}: Props) {
    const [isPending, setIsPending] = useState(false);
    const [form, setForm] = useState<AlojamentoForm>({
        nome: "",
        bairro: "",
        rua: "",
        numero: "",
        cep: ""
    });

    useEffect(() => {
        if (isOpen && id) {
            async function fetchData() {
                try {
                    const res = await fetch(`/api/alojamentos/${id}`);
                    if (!res.ok) {
                        throw new Error('Falha ao buscar dados do alojamento');
                    }
                    const data = await res.json();

                    setForm({
                        nome: data.alojamento || "", 
                        bairro: data.bairro || "",
                        rua: data.rua || "",
                        numero: data.numero || "",
                        cep: data.cep || ""
                    });

                } catch (error) {
                    console.error(error);
                }
            }
            fetchData();
        }
    }, [id, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

       
        const dataToSend = {
            ...form,
            numero: Number(form.numero), 
            cep: Number(form.cep)       
        };

        try {
            await fetch(`/api/alojamentos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
            onClose();
        }
    };

    return (
        <Popup_func_editar isOpen={isOpen} onCLose={onClose}>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Editar Alojamento</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo Nome */}
                    <div>
                        <label className="block text-sm mb-1">Nome</label>
                        <input type="text" name="nome" value={form.nome} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Campo Bairro */}
                    <div>
                        <label className="block text-sm mb-1">Bairro</label>
                        <input type="text" name="bairro" value={form.bairro} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Campo Rua */}
                    <div>
                        <label className="block text-sm mb-1">Rua</label>
                        <input type="text" name="rua" value={form.rua} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Campo Número */}
                    <div>
                        <label className="block text-sm mb-1">Número</label>
                        <input type="number" name="numero" value={form.numero} onChange={handleChange} min="1" className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Campo CEP */}
                    <div>
                        <label className="block text-sm mb-1">CEP</label>
                        <input type="number" name="cep" value={form.cep} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

    <button
    type="submit"
    disabled={isPending}
    // O onClick foi totalmente removido.
    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
>
    {isPending ? "Salvando..." : "Salvar Alterações"}
</button>
                </form>
            </div>
        </Popup_func_editar>
    );
}