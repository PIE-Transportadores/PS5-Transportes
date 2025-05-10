
import './cadastro_fun.css'

interface ModalFuncionario{
    isOpen: boolean,
    onClose:()=>void,
    children:React.ReactNode

}

const Popup: React.FC<ModalFuncionario> = ({isOpen,onClose,children}) =>{
    if (!isOpen) return null

    return(
        <div className="modal_func">
            <div className="mini_modal">
                <button onClick={onClose} className="#">X</button>
                <div className='conteudo_modal'>{children}</div>
            </div>
        </div>
    )
}
export default Popup