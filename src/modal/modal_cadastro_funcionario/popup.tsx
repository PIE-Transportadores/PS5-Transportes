
interface ModalFuncionario{
    isOpen: boolean,
    onClose:()=>void,
    children:React.ReactNode

}

const Popup: React.FC<ModalFuncionario> = ({isOpen,onClose,children}) =>{
    if (isOpen == false) return null

    return(
        <div className="#">
            <div className="#">
                <button onClick={onClose} className="#">X</button>
                {children}
            </div>
            
        </div>
    )
}

export default Popup