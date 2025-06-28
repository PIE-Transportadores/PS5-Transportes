'use client'

import { useEffect, useState } from "react";
import { Popup_garagem_editar } from "./pop-garagem";
import { buscarGaragens } from "@/app/api/garagem/utils/BuscarGaragem";

interface Props {
  id: number
  isOpen: boolean
  onClose: () => void
  reabrirlista: () => void
}

export default function Form_Garagem_Edit({id, isOpen, onClose, reabrirlista}: Props){
    const [isPending, setIsPending] = useState(false);
    const [dados, setDados] = useState({});

    const [form, setForm] = useState({
        nome_garagem: "",
        rua: "",
        bairro: "",
        numero: "",
        cep: ""
    });

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/garagem/${id}`);
            const data = await res.json();
            setForm(data);
        }
        fetchData();
    }, [id]);

    async function carregar() {
        const data = await buscarGaragens();
        setDados(data);
    }

    useEffect(() => {
        carregar();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        await fetch(`/api/garagem/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        onClose();
        setIsPending(false);
    };

    return (
        <Popup_garagem_editar isOpen={isOpen} onClose={onClose}>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[550px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Editar Garagem</h2>
                    <button onClick={() => { onClose(); reabrirlista(); }} className="text-gray-400 hover:text-white text-xl">×</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.entries(form).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-sm mb-1">{key.replace("_", " ").toUpperCase()}</label>
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={isPending}
                        onClick={() => setTimeout(() => { reabrirlista(); carregar(); }, 1300)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
                    >
                        {isPending ? "Salvando..." : "Salvar alterações"}
                    </button>
                </form>
            </div>
        </Popup_garagem_editar>
    );
}