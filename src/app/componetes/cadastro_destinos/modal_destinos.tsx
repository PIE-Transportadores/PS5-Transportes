'use client'
import Popup from "@/modal/modal_cadastro_destinos/popup"
import CriarDestino from "@/action/service/destino-service";
import React, { useEffect, useState, useTransition } from "react";

// O tipo de estado do formulário permanece o mesmo
type FormState = {
    sucesso: boolean;
    message: string;
    errors?: {
        [key: string]: string[] | undefined;
    } | null;
}

const inicializarForm: FormState = { sucesso: false, message: "", errors: null }

// Apenas a função de buscar endereço por CEP permanece no cliente
async function buscarEnderecoPorCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) return null;
    return await response.json();
}

// REMOVIDO: A função buscarLatLongPorEndereco não é mais necessária aqui.
// Ela será movida para o servidor.

export default function ModalDestinos({ isOpen, onClose, reabrirlista }: any) {
    const [state, formAction] = React.useActionState(CriarDestino, inicializarForm)
    const [isPending, startTransition] = useTransition()
    
    const [erros, setErrors] = useState<any>({})

    // Estados do formulário (sem latitude e longitude)
    const [destino, setDestino] = useState("")
    const [rua, setRua] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [numero, setNumero] = useState("")
    const [cep, setCep] = useState("")
    
    // REMOVIDO: Os estados de latitude e longitude não são mais necessários no cliente
    // const [latitude, setLatitude] = useState("")
    // const [longitude, setLongitude] = useState("")

    // Efeito para tratar a resposta da Server Action (sucesso ou erro)
    useEffect(() => {
        if (state.sucesso && isOpen) {
            alert(state.message || "Destino cadastrado com sucesso!");
            onClose(); 
            reabrirlista(); 
        } else if (!state.sucesso && state.message) {
            alert(`Erro: ${state.message}`);
            if (state.errors) {
                setErrors(state.errors);
            }
        }
    }, [state, isOpen, onClose, reabrirlista]);

    // Efeito para buscar o endereço quando o CEP é digitado
    useEffect(() => {
        if (cep.length === 8) {
            buscarEnderecoPorCep(cep).then(data => {
                if (data && !data.erro) {
                    setRua(data.logradouro || "");
                    setBairro(data.bairro || "");
                    setCidade(data.localidade || "");
                    setEstado(data.uf || "");
                }
            });
        }
    }, [cep]);
    
    // REMOVIDO: O useEffect para buscar coordenadas não é mais necessário.

    // A função de submit agora é muito mais simples
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        setErrors({});

        startTransition(() => {
            // Apenas chama a action com os dados do formulário.
            // O servidor cuidará do resto.
            formAction(formData);
        });
    }

    return (
        <div className="modal_destinos">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Cadastrar Destino</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
                    </div>
                    
                    <form onSubmit={handleSubmit} key={JSON.stringify(erros)} className="space-y-4">
                        {/* Seus inputs continuam exatamente os mesmos */}
                        <div>
                            <label className="block text-sm mb-1">Nome do Destino</label>
                            <input type="text" name="destino" value={destino} onChange={e => setDestino(e.target.value)} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.destino && <p className="text-red-400 text-sm mt-1">{erros.destino[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">CEP</label>
                            <input type="text" name="cep" value={cep} onChange={e => setCep(e.target.value.replace(/\D/g, ''))} maxLength={8} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Rua</label>
                            <input type="text" name="rua" value={rua} onChange={e => setRua(e.target.value)} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Bairro</label>
                            <input type="text" name="bairro" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Cidade</label>
                            <input type="text" name="cidade" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.cidade && <p className="text-red-400 text-sm mt-1">{erros.cidade[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Estado</label>
                            <input type="text" name="estado" value={estado} onChange={e => setEstado(e.target.value)} maxLength={2} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.estado && <p className="text-red-400 text-sm mt-1">{erros.estado[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Número</label>
                            <input type="text" name="numero" value={numero} onChange={e => setNumero(e.target.value)} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero[0]}</p>}
                        </div>
                        
                        {/* REMOVIDO: Os campos ocultos não são mais necessários */}
                        
                        <button type="submit" disabled={isPending} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition disabled:bg-gray-500">
                            {isPending ? 'Salvando...' : '+ Adicionar novo destino'}
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}