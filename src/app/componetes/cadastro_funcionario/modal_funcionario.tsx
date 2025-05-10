'use client'
import Popup from "@/modal/modal_cadastro_funcionario/popup"
import './conteudo_modal.css'
import CriarFunc from "@/action/service/func-service";
import { useActionState } from 'react'
import { useEffect} from "react";

const inicializarForm = {sucesso: false}

export default function ModalFuncionario({ isOpen, onClose }:any){

    const [state,formAction] = useActionState(CriarFunc,inicializarForm)
    

        useEffect(()=>{
            if (state.sucesso == true && isOpen == true){
                onClose()
                
            }else{
                state.sucesso = false
            }

        },[state.sucesso,onClose])
    
    return(
        <div className="modal_func">
            
            <Popup isOpen = {isOpen} onClose={onClose}>
                <div className="conteudo_modal">
                    <form  action={formAction}>
                        <label htmlFor="#">Cadastro de Funcionario</label>
                        <input type="text" name="nome" placeholder="Nome Completo" />
                        <input type="number" name="cpf" placeholder="CPF" />
                        <input type="text" name = "turno" placeholder="Turno" />
                        <input type="text" name = "alojamento" placeholder="Selecionar Alojamento" />
                        <button type="submit">Salvar Funcionario</button>
                    </form>

                </div>             
            </Popup>

        </div>
    )


}