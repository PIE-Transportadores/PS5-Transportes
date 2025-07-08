'use client'
import React, { useEffect, useState } from "react"
import Popup from "@/modal/modal_cadastro_destinos/popup"

// Função para buscar os dados iniciais do destino
async function buscarDestinoPorId(id: number) {
    const res = await fetch(`/api/destinos/${id}`)
    if (!res.ok) return null
    return await res.json()
}

// Função para buscar endereço pelo CEP
async function buscarEnderecoPorCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if (!response.ok) return null
    return await response.json()
}

export default function Form_Destino_Edit({ id, isOpen, onClose, reabrirlista }: any) {
    // Estado simplificado, sem latitude e longitude
    const [formState, setFormState] = useState({
        destino: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
        cep: "",
    });
    const [isPending, setIsPending] = useState(false);

    // Efeito para carregar os dados do destino quando o modal abre
    useEffect(() => {
        if (id && isOpen) {
            buscarDestinoPorId(id).then(data => {
                if (data) {
                    setFormState({
                        destino: data.destino || "",
                        rua: data.rua || "",
                        bairro: data.bairro || "",
                        cidade: data.cidade || "",
                        estado: data.estado || "",
                        numero: data.numero?.toString() || "",
                        cep: data.cep || "",
                    });
                }
            })
        }
    }, [id, isOpen]);

    // Manipulador genérico para atualizar o estado do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    // Manipulador para o campo de CEP com máscara e busca automática de endereço
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        const finalValue = value.slice(0, 9);
        setFormState(prevState => ({ ...prevState, cep: finalValue }));

        if (finalValue.replace(/\D/g, '').length === 8) {
            buscarEnderecoPorCep(finalValue.replace(/\D/g, '')).then(data => {
                if (data && !data.erro) {
                    setFormState(prevState => ({
                        ...prevState,
                        rua: data.logradouro || prevState.rua,
                        bairro: data.bairro || prevState.bairro,
                        cidade: data.localidade || prevState.cidade,
                        estado: data.uf || prevState.estado,
                    }));
                }
            });
        }
    };

    // Manipulador para o envio do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const res = await fetch(`/api/destinos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                // Envia apenas os dados do endereço. O backend cuidará das coordenadas.
                body: JSON.stringify(formState)
            });

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Falha ao atualizar o destino.");
            }

            alert("Destino atualizado com sucesso!");
            onClose();
            reabrirlista();

        } catch (error: any) {
            console.error(error);
            alert(`Erro: ${error.message}`);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Editar Destino</h2>
                    <button onClick={()=>{onClose();reabrirlista()}} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-x-6 space-y-4 md:space-y-0">
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">Nome do Destino</label>
                            <input type="text" name="destino" value={formState.destino} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">CEP</label>
                            <input type="text" name="cep" value={formState.cep} onChange={handleCepChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Rua</label>
                            <input type="text" name="rua" value={formState.rua} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Bairro</label>
                            <input type="text" name="bairro" value={formState.bairro} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Número</label>
                            <input type="text" name="numero" value={formState.numero} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Cidade</label>
                            <input type="text" name="cidade" value={formState.cidade} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="pt-4 md:pt-4">
                            <label className="block text-sm mb-1">Estado</label>
                            <input type="text" name="estado" value={formState.estado} onChange={handleChange} maxLength={2} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <div className="pt-6">
                        <button type="submit" disabled={isPending} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition disabled:bg-gray-500">
                            {isPending ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    )
}
