
import Popup from "@/modal/modal_cadastro_funcionario/popup"


type ModalFuncionarioProps = {
    isOpen: boolean;
    onClose: () => void;
};
export default function ModalFuncionario({ isOpen, onClose }:ModalFuncionarioProps){

    
    return(
        <div>
            
            <Popup isOpen = {isOpen} onClose={onClose}>

                <form action="#">
                    <input type="text" placeholder="Nome Completo" />
                    <input type="number" placeholder="CPF" />
                    <input type="text" placeholder="Turno" />
                    <input type="text" placeholder="Selecionar Alojamento" />
                    <button type="submit">Salvar Funcionario</button>
                </form>

            </Popup>

        </div>
    )


}