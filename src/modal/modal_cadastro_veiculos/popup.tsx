
interface ModalVeiculos{
    isOpen: boolean,
    onClose:()=>void,
    children:React.ReactNode

}

const Popup: React.FC<ModalVeiculos> = ({isOpen,onClose,children}) =>{
    if (!isOpen) return null

    return(
        <div className="modal_veiculos">
            <div className="mini_modal">
                <button onClick={onClose} className="#">X</button>
                <div className='conteudo_modal'>{children}</div>
            </div>
        </div>
    )
}
export default Popup