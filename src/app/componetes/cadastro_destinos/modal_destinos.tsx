'use client'
import Popup from "@/modal/modal_cadastro_destinos/popup"
import CriarDestino from "@/action/service/destino-service";
import React, { useEffect, useState, useTransition } from "react";
import { getAddressFromCepAction } from "@/action/cepAction"; // Usando a mesma Server Action da Garagem

type FormState = {
    sucesso: boolean;
    message: string;
    errors?: { [key: string]: string[] | undefined; } | null;
}

const inicializarForm: FormState = { sucesso: false, message: "", errors: null }

export default function ModalDestinos({ isOpen, onClose, reabrirlista }: any) {
    const [state, formAction] = React.useActionState(CriarDestino, inicializarForm)
    const [isPending, startTransition] = useTransition()
    
    // Estados para controlar os campos e os erros
    const [erros, setErrors] = useState<any>({})
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    
    const [isFetchingCep, setIsFetchingCep] = useState(false);
    const [erroCep, setErroCep] = useState<string | null>(null);

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
    
    // --- ATUALIZADO: Lógica para buscar endereço e coordenadas via Server Action ---
    const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
        const form = event.currentTarget.form;
        if (!form) return;

        const cepValue = event.target.value.replace(/\D/g, '');

        if (cepValue.length !== 8) return;

        setIsFetchingCep(true);
        setErroCep(null);

        const result = await getAddressFromCepAction(cepValue);

        setIsFetchingCep(false);

        if (result.success) {
            setRua(result.data.address ?? '');
            setBairro(result.data.district ?? '');
            setCidade(result.data.city ?? '');
            setEstado(result.data.state ?? '');

            // Preenche os inputs ocultos com as coordenadas
            (form.elements.namedItem('latitude') as HTMLInputElement).value = result.data.latitude.toString();
            (form.elements.namedItem('longitude') as HTMLInputElement).value = result.data.longitude.toString();

            (form.elements.namedItem('numero') as HTMLInputElement)?.focus();
        } else {
            setErroCep(result.error || "CEP não encontrado");
            setRua("");
            setBairro("");
            setCidade("");
            setEstado("");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setErrors({});
        startTransition(() => {
            formAction(formData);
        });
    }

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        setCep(value.slice(0, 9));
    }

    return (
        <div className="modal_destinos">
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Cadastrar Novo Destino</h2>
                        <button onClick={()=>{onClose();reabrirlista()}} className="text-gray-400 hover:text-white text-2xl">×</button>
                    </div>
                    
                    <form onSubmit={handleSubmit} key={JSON.stringify(erros)}>
                        <div className="grid md:grid-cols-2 md:gap-x-6 space-y-4 md:space-y-0">
                            <div className="md:col-span-2">
                                <label className="block text-sm mb-1">Nome do Destino</label>
                                <input type="text" name="destino" placeholder="Ex: Fazenda Santa Maria, Cliente XYZ" className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erros.destino && <p className="text-red-400 text-sm mt-1">{erros.destino[0]}</p>}
                            </div>
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">CEP</label>
                                <input type="text" name="cep" value={cep} onChange={handleCepChange} onBlur={handleCepBlur} placeholder="00000-000" className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erroCep && <p className="text-red-400 text-sm mt-1">{erroCep}</p>}
                                {isFetchingCep && <p className="text-blue-400 text-sm mt-1">Buscando...</p>}
                            </div>
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Rua</label>
                                <input type="text" name="rua" value={rua} onChange={e => setRua(e.target.value)} placeholder="Rua, Avenida, etc." className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua[0]}</p>}
                            </div>
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Bairro</label>
                                <input type="text" name="bairro" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro[0]}</p>}
                            </div>
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Número</label>
                                <input type="text" name="numero" className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero[0]}</p>}
                            </div>
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Cidade</label>
                                <input type="text" name="cidade" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erros.cidade && <p className="text-red-400 text-sm mt-1">{erros.cidade[0]}</p>}
                            </div>
                            <div className="pt-4 md:pt-4">
                                <label className="block text-sm mb-1">Estado</label>
                                <input type="text" name="estado" value={estado} onChange={e => setEstado(e.target.value)} maxLength={2} placeholder="UF" className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                                {erros.estado && <p className="text-red-400 text-sm mt-1">{erros.estado[0]}</p>}
                            </div>
                            
                            {/* --- ATUALIZADO: Inputs ocultos para latitude e longitude --- */}
                            <input type="hidden" name="latitude" />
                            <input type="hidden" name="longitude" />
                        </div>
                        
                        <div className="pt-6">
                            <button type="submit" disabled={isPending} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded transition disabled:bg-gray-500 font-semibold">
                                {isPending ? 'Salvando...' : '+ Adicionar Novo Destino'}
                            </button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    )
}
