'use client'

import { useEffect, useState } from "react";
import { Popup_garagem_editar } from "./pop-garagem";
import { buscarGaragens } from "@/app/api/garagem/utils/BuscarGaragem";

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  reabrirlista: () => void;
}

interface FormData {
  nome_garagem: string;
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
}

interface ErrosForm {
  nome_garagem?: string;
  rua?: string;
  bairro?: string;
  numero?: string;
  cep?: string;
}

export default function Form_Garagem_Edit({ id, isOpen, onClose, reabrirlista }: Props) {
  const [form, setForm] = useState<FormData>({
    nome_garagem: "",
    rua: "",
    bairro: "",
    numero: "",
    cep: ""
  });

  const [erros, setErros] = useState<ErrosForm>({});
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isOpen) {
        async function fetchData() {
        const res = await fetch(`/api/garagem/${id}`);
        const data = await res.json();

        setForm({
            nome_garagem: data.garagem ?? '',
            rua: data.rua ?? '',
            bairro: data.bairro ?? '',
            numero: data.numero ?? '',
            cep: data.cep ?? ''
        });

        setErros({});
        }

        fetchData();
    }
    }, [id, isOpen]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numero = form.numero?.toString().trim() ?? '';
    const novosErros: ErrosForm = {};
    if (!form.nome_garagem.trim()) novosErros.nome_garagem = 'Nome é obrigatório';
    if (!form.rua.trim()) novosErros.rua = 'Rua é obrigatória';
    if (!form.bairro.trim()) novosErros.bairro = 'Bairro é obrigatório';
    if (!numero) novosErros.numero = 'Número é obrigatório';
    if (!form.cep.trim()) novosErros.cep = 'CEP é obrigatório';

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setIsPending(true);

    await fetch(`/api/garagem/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    setIsPending(false);
    onClose();
    reabrirlista();
  };

  return (
    <Popup_garagem_editar isOpen={isOpen} onClose={onClose}>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Editar Garagem</h2>
          <button onClick={() => { onClose(); reabrirlista(); }} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input
              type="text"
              name="nome_garagem"
              value={form.nome_garagem}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.nome_garagem && <p className="text-red-400 text-sm mt-1">{erros.nome_garagem}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">CEP</label>
            <input
              type="text"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Rua</label>
            <input
              type="text"
              name="rua"
              value={form.rua}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Bairro</label>
            <input
              type="text"
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Número</label>
            <input
              type="text"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          >
            {isPending ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
    </Popup_garagem_editar>
  );
}
