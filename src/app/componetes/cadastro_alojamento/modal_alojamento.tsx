'use client'
import Popup from "@/modal/modal_cadastro_alojamento/popup"
import React, { useActionState } from 'react'
import CriarAloj from "@/action/service/aloj-service";
import { useEffect, useState, useTransition } from "react";
import { getAddressFromCepAction } from "@/action/cepAction"

// AQUI ESTÁ A CORREÇÃO
const inicializarForm = { sucesso: false, erro: null };

export default function ModalAlojamento({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const [state, formAction] = useActionState(CriarAloj, inicializarForm);
    const [isPending, startTransition] = useTransition();

    interface ErrosForm {
        nome?: string;
        bairro?: string;
        rua?: string;
        numero?: string;
        cep?: string;
        capacidade?: string;
    }

    const [erros, setErrors] = useState<ErrosForm>({});

    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [isFetchingCep, setIsFetchingCep] = useState(false);


    useEffect(() => {
        if (state.sucesso && isOpen) {
            onClose();
        }
    }, [state.sucesso, onClose, isOpen]);

   // Dentro do seu componente ModalAlojamento

const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    // 1. SALVAMOS A REFERÊNCIA AO FORMULÁRIO IMEDIATAMENTE
    const form = event.currentTarget.form;
    const cepValue = event.target.value.replace(/\D/g, '');

    if (cepValue.length !== 8) {
        return;
    }

    setIsFetchingCep(true);
    // 2. A "pausa" do await acontece aqui.
    const result = await getAddressFromCepAction(cepValue);
    setIsFetchingCep(false);

    if (result.success) {
        setRua(result.data.address);
        setBairro(result.data.district);

        // 3. AGORA USAMOS A VARIÁVEL 'form' QUE SALVAMOS ANTES. ELA NÃO É NULA.
        if (form) {
            const numeroInput = form.elements.namedItem('numero') as HTMLInputElement;
            if (numeroInput) numeroInput.focus();
        }
    } else {
        alert(result.error);
    }
};

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const nome = formData.get('nome')?.toString().trim() ?? "";
        const bairroForm = formData.get('bairro')?.toString().trim() ?? "";
        const numero = formData.get('numero')?.toString().trim() ?? "";
        const cepForm = formData.get('cep')?.toString().trim() ?? "";
        const ruaForm = formData.get('rua')?.toString().trim() ?? "";
        const capacidade = formData.get('capacidade')?.toString().trim() ?? "";

        const newErrors: ErrosForm = {};

        if (!nome) newErrors.nome = "Nome é obrigatório";
        if (!bairroForm) newErrors.bairro = "Bairro é obrigatório";
        if (!numero) newErrors.numero = "Número é obrigatório";
        if (!cepForm) newErrors.cep = "CEP é obrigatório";
        if (!ruaForm) newErrors.rua = "Rua é obrigatória";
        if (!capacidade) newErrors.capacidade = "Capacidade é obrigatória";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <div className="modal_aloj">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[auto]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-sans text-white">Cadastro de Alojamento</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className="block text-sm mb-1">Nome</label>
                            <input className=" w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="nome"
                                placeholder="Alojamento"
                            />
                            {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
                        </div>

                        {/* Novo campo Capacidade */}
                        <div className="">
                            <label className="block text-sm mb-1">Capacidade</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                name="capacidade"
                                placeholder="Capacidade"
                                min="1"
                            />
                            {erros.capacidade && <p className="text-red-400 text-sm mt-1">{erros.capacidade}</p>}
                        </div>

                        <div className="">
                            <label className="block text-sm mb-1">Capacidade</label>
                            <input className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                name="capacidade"
                                placeholder="Capacidade"
                                min="1"
                            />
                            {erros.capacidade && <p className="text-red-400 text-sm mt-1">{erros.capacidade}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">CEP:</label>
                            <input
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                placeholder="CEP"
                                name="cep"
                                type="text"
                                maxLength={9}
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                onBlur={handleCepBlur}
                            />
                            {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep}</p>}
                            {isFetchingCep && <p className="text-blue-400 text-sm">Buscando endereço...</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Rua</label>
                            <input
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rua"
                                type="text"
                                name="rua"
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                            />
                            {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua}</p>}
                        </div>

                        <div className="">
                            <label className="block text-sm mb-1">Bairro</label>
                            <input
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="bairro"
                                placeholder="Bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                            {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro}</p>}
                        </div>

                        <div className="">
                            <label className="block text-sm mb-1">Número:</label>
                            <input
                                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                name="numero"
                                placeholder="Número"
                                min="1"
                            />
                            {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero}</p>}
                        </div>

                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition mt-4"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Salvando...' : 'Cadastrar'}
                        </button>
                        
                        {/* Exibindo a mensagem de erro que vem do servidor */}
                        {state?.erro && <p className="text-red-400 text-sm mt-1">{state.erro}</p>}
                    </form>
                </div>
            </Popup>
        </div>
    );
}