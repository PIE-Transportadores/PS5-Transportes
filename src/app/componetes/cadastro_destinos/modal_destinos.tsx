'use client'
import Popup from "@/modal/modal_cadastro_destinos/popup"
import CriarDestino from "@/action/service/destino-service";
import React, { useEffect, useState, useTransition } from "react";

// Definindo um tipo para o estado do formulário para maior clareza e segurança
type FormState = {
    sucesso: boolean;
    message: string;
    errors?: {
        [key: string]: string[] | undefined;
    } | null;
}

// --- CORREÇÃO AQUI ---
// O estado inicial agora corresponde exatamente ao que a action retorna.
// 'message' começa como uma string vazia.
const inicializarForm: FormState = { sucesso: false, message: "", errors: null }

// Funções de busca de endereço (sem alterações)
async function buscarEnderecoPorCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) return null;
    return await response.json();
}

async function buscarLatLongPorEndereco(endereco: string) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
    const data = await response.json();
    if (data && data.length > 0) {
        return { latitude: data[0].lat, longitude: data[0].lon };
    }
    return { latitude: "", longitude: "" };
}

export default function ModalDestinos({ isOpen, onClose, reabrirlista }: any) {
    // Com a correção acima, o TypeScript agora entende perfeitamente os tipos.
    const [state, formAction] = React.useActionState(CriarDestino, inicializarForm)
    const [isPending, startTransition] = useTransition()
    
    // O estado de 'erros' agora será preenchido pela resposta do servidor
    const [erros, setErrors] = useState<any>({})

    // Estados para controlar os campos do formulário (sem alterações)
    const [destino, setDestino] = useState("")
    const [rua, setRua] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [numero, setNumero] = useState("")
    const [cep, setCep] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    // Efeito para reagir à resposta da Server Action
    useEffect(() => {
        if (state.sucesso && isOpen) {
            alert(state.message || "Destino cadastrado com sucesso!");
            onClose(); // Fecha o modal
            reabrirlista(); // Atualiza a lista de destinos
        } else if (!state.sucesso && state.message) {
            // Se houve um erro, mostra a mensagem e atualiza os erros dos campos
            alert(`Erro: ${state.message}`);
            if (state.errors) {
                setErrors(state.errors);
            }
        }
    }, [state, isOpen, onClose, reabrirlista]);

    // Efeitos de busca de CEP e coordenadas (sem alterações)
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

    useEffect(() => {
        if (rua && bairro && cidade && estado && numero && cep) {
            const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}, Brasil`;
            buscarLatLongPorEndereco(enderecoCompleto).then(coords => {
                setLatitude(coords.latitude);
                setLongitude(coords.longitude);
            });
        }
    }, [rua, bairro, cidade, estado, numero, cep]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Limpa os erros antigos antes de uma nova submissão
        setErrors({});

        startTransition(() => {
            // Apenas chama a action. A lógica de feedback está no useEffect.
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
                    {/* O 'key={JSON.stringify(erros)}' ajuda a forçar a re-renderização do form quando os erros mudam */}
                    <form onSubmit={handleSubmit} key={JSON.stringify(erros)} className="space-y-4">
                        {/* Input Destino */}
                        <div>
                            <label className="block text-sm mb-1">Nome do Destino</label>
                            <input type="text" name="destino" value={destino} onChange={e => setDestino(e.target.value)} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.destino && <p className="text-red-400 text-sm mt-1">{erros.destino[0]}</p>}
                        </div>
                        {/* Input CEP */}
                        <div>
                            <label className="block text-sm mb-1">CEP</label>
                            <input type="text" name="cep" value={cep} onChange={e => setCep(e.target.value.replace(/\D/g, ''))} maxLength={8} className="w-full p-2 bg-gray-700 rounded"/>
                            {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep[0]}</p>}
                        </div>
                        {/* Outros inputs de endereço... */}
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
                        
                        {/* Campos ocultos para latitude e longitude */}
                        <input type="hidden" name="latitude" value={latitude} />
                        <input type="hidden" name="longitude" value={longitude} />
                        
                        <button type="submit" disabled={isPending} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition disabled:bg-gray-500">
                            {isPending ? 'Salvando...' : '+ Adicionar novo destino'}
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}
