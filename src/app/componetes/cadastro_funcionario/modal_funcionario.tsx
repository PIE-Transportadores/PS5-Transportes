'use client'
import Popup from "@/modal/modal_cadastro_funcionario/popup"
import CriarFunc from "@/action/service/func-service";
import React, { use, useActionState } from 'react'
import { useEffect,useState,useTransition} from "react";
import BuscarAlojamento from "@/app/api/funcionarios/utils/BuscarAlojamento";
import { buscarFuncionarios } from "@/app/api/funcionarios/utils/BuscarFuncionario";


const inicializarForm = {sucesso: false}

export default function ModalFuncionario({ isOpen, onClose,reabrirlista }:any){

    const [state,formAction] = useActionState(CriarFunc,inicializarForm)
    const [isPending, startTransition] = useTransition()
    const [cpf, setCpf] = useState("")
    const [viws_f,setViws_f] = useState(false)

    interface ErrosForm {
        nome?: string
        cpf?: string
        turno?: string
        alojamento?: string
    }


    const [erros,setErrors] = useState<ErrosForm>({})

    type Alojamento = {
        id: number;
        alojamento:string;
        cep: string;
        rua:string;
        bairro: string;
        numero:string
    }

    const [Aloj,setAloj] = useState<Alojamento[]>([])

    async function carregarAlojamento(){
        const data = await BuscarAlojamento()  
        setAloj(data)

    }

    useEffect(()=>{
        carregarAlojamento()
    },[])

        
    

    useEffect(()=>{
        if (state.sucesso == true && isOpen == true){
            onClose()
            
        }else{
            state.sucesso = false
        }

    },[state.sucesso,onClose])


    const hendleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        

        

        const formData = new FormData(e.currentTarget)
        const nome = formData.get('nome')?.toString().trim() ?? ""
        const cpf = formData.get('cpf')?.toString().replace(/\D/g, '') ?? ""
        const turno = formData.get('turno')?.toString().trim() ?? ""
        const alojamento = formData.get('alojamento')?.valueOf() ?? ""

        const newErrors: any = {}

        if (!nome) newErrors.nome = "Nome é obrigatorio"
        if(!turno) newErrors.turno = "Turno é obrigatorio"
        if(!alojamento) newErrors.alojamento = "Alojamento é obrigatorio" 

        if (!cpf) {
            newErrors.cpf = "CPF é obrigatório"
        } 

        if(Object.keys(newErrors).length > 0){
        setErrors(newErrors)
        return
        }

        setErrors({})

        startTransition(()=>{
        formAction(formData)
        alert("Formulario Enviado")
        })
        
    }




     
    function formatarCPF(valor: string) {
        return valor
            .replace(/\D/g, "") 
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14) 
    }


        
    
    return(
        <div className="modal_func">
            
            <Popup isOpen={isOpen} onClose={onClose}>
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[550px]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Cadastrar Funcionário</h2>
                        <button onClick={()=>{
                            onClose()
                            reabrirlista()
                        }} 
                        className="text-gray-400 hover:text-white text-xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={hendleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Nome</label>
                        <input
                        type="text"
                        name="nome"
                        placeholder="Digite o nome completo"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">CPF</label>
                        <input
                        type="text"
                        name="cpf"
                        value={cpf}
                        placeholder="Digite o CPF"
                        onChange={(e)=> setCpf(formatarCPF(e.target.value))}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {erros.cpf && <p className="text-red-400 text-sm mt-1">{erros.cpf}</p>}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Turno</label>
                        <select
                        name="turno"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="">Selecione o turno</option>
                        <option value="1° Turno">1° Turno</option>
                        <option value="2° Turno">2° Turno</option>
                        <option value="3° Turno">3° Turno</option>
                        </select>
                        {erros.turno && <p className="text-red-400 text-sm mt-1">{erros.turno}</p>}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Alojamento</label>
                        <select
                        name="alojamento"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Aloj.map((Aloj1)=>(
                                <option 
                                    value={Aloj1.alojamento}
                                    key={Aloj1.id}
                                >
                                    {Aloj1.alojamento}
                                </option>

                            ))}
                        
                        
                        </select>
                        {erros.alojamento && <p className="text-red-400 text-sm mt-1">{erros.alojamento}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
                        onClick={()=>{
                            setTimeout(()=>{
                                reabrirlista()
                            },2000)
                            
                        }}
                    >
                        {isPending ? 'Salvando...' : '+ Adicionar novo funcionário'}
                    </button>
                    </form>
                </div>
            </Popup>


        </div>
    )


}