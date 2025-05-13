'use client'
import Popup from "@/modal/modal_cadastro_funcionario/popup"
import './conteudo_modal.css'
import CriarFunc from "@/action/service/func-service";
import React, { useActionState } from 'react'
import { useEffect,useState,useTransition} from "react";

const inicializarForm = {sucesso: false}

export default function ModalFuncionario({ isOpen, onClose }:any){

    const [state,formAction] = useActionState(CriarFunc,inicializarForm)
    const [isPending, startTransition] = useTransition()

    interface ErrosForm {
            nome?: string
            cpf?: string
            turno?: string
            alojamento?: string
        }
    const [erros,setErrors] = useState<ErrosForm>({})
    

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
            const turno = formData.get('turno')?.toString().trim() ?? ""
            const alojamento = formData.get('alojamento')?.valueOf() ?? ""

            const newErrors: any = {}

           if (!nome) newErrors.nome = "Nome é obrigatorio"
           if(!turno) newErrors.turno = "Turno é obrigatorio"
           if(!alojamento) newErrors.alojamento = "Alojamento é obrigatorio" 

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

        
    
    return(
        <div className="modal_func">
            
            <Popup isOpen = {isOpen} onClose={onClose}>
                <div className="conteudo_modal">
                    <form  onSubmit={hendleSubmit}>
                        <div className="form-group">
                            <input type="text" name="nome" placeholder="Nome Completo" />
                            {erros.nome && <p className="erro">{erros.nome}</p>}
                        </div>

                        <div className="form-group">
                            <input type="number" name="cpf" placeholder="CPF" />
                            {erros.cpf && <p className="erro">{erros.cpf}</p>}
                        </div>

                        <div className="form-group">
                            <select  name="turno">
                                <option value=""></option>
                                <option value="1° Turno">1°Turno</option>
                                <option value="2° Turno">2°Turno</option>
                                <option value="3° Turno">3°Turno</option>
                            </select>                         
                            {erros.turno && <p className="erro">{erros.turno}</p>}
                        </div>

                        <div className="form-group">
                            <select  name="alojamento" id="alojamento">
                                <option value=""></option>
                                <option value="alojamento 1">Alojameto 1</option>
                                <option value="alojamento 2">Alojameto 3</option>
                                <option value="alojamento 3">Alojameto 4</option>                         
                              </select>
                            {erros.alojamento && <p className="erro">{erros.alojamento}</p>}
                        </div>                      
                        <button type="submit" disabled={isPending}>{isPending ? 'Salvando...' : 'Salvar Funcionário'}</button>
                    </form>

                </div>             
            </Popup>

        </div>
    )


}