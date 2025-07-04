import { useEffect, useState } from "react";
import { Popup_serv_editar } from "./pop-serv";
import { buscarServicos } from "@/app/api/servico/utils/BuscarServico";
import BuscarAlojamento from "@/app/api/funcionarios/utils/BuscarAlojamento";

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  reabrirlista: () => void;
}

export default function Form_Serv_Edit({ id, isOpen, onClose, reabrirlista }: Props) {

  const [isPending, setIsPending] = useState(false);
  const [dados, setDados] = useState({});
  const [aloj, setAloj] = useState<Alojamento[]>([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    data_inicio: "",
    data_fim: "",
    alojamento: ""
  });

  type Alojamento = {
    id: number;
    alojamento: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/servicos/${id}`);
      const data = await res.json();
      setForm(data);
    }
    fetchData();
  }, [id]);

  async function carregar() {
    const data = await buscarServicos();
    setDados(data);
  }

  async function carregarAlojamento() {
    const data = await BuscarAlojamento();
    setAloj(data);
  }

  useEffect(() => {
    carregar();
    carregarAlojamento();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const res = await fetch(`/api/servicos/${id}`, {
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
    <Popup_serv_editar isOpen={isOpen} onClose={onClose}>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[550px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Editar Serviço</h2>
          <button onClick={() => { onClose(), reabrirlista() }}
            className="text-gray-400 hover:text-white text-xl">×</button>
        </div>

        <form onSubmit={handleSubmint} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Descrição</label>
            <input
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Data Início</label>
            <input
              type="date"
              name="data_inicio"
              value={form.data_inicio}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Data Fim</label>
            <input
              type="date"
              name="data_fim"
              value={form.data_fim}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Alojamento</label>
            <select
              name="alojamento"
              value={form.alojamento}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {aloj.map((aloj1) => (
                <option
                  value={aloj1.alojamento}
                  key={aloj1.id}
                >
                  {aloj1.alojamento}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            onClick={() => {
              setTimeout(() => {
                reabrirlista();
                carregar();
              }, 1300);
            }}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          >
            {isPending ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>

    </Popup_serv_editar>
  );
}
