
import Popup from "@/modal/modal_cadastro_funcionario/popup"
import './conteudo_modal.css'
import CriarFunc from "@/action/service/func-service";


type ModalFuncionarioProps = {
    isOpen: boolean;
    onClose: () => void;
};
export default function ModalFuncionario({ isOpen, onClose }:ModalFuncionarioProps){

    
    return(
        <div className="modal_func">
            
            <Popup isOpen = {isOpen} onClose={onClose} >
                <div className="conteudo_modal">
                    <form action={CriarFunc}>
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