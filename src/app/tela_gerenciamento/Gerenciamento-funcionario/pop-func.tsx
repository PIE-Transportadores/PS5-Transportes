
interface ModalFuncionario2{
    isOpen_func:boolean,
    onClose_func:()=> void,
    children:React.ReactNode
}

const Popup_func: React.FC<ModalFuncionario2> = ({isOpen_func,onClose_func,children}) =>{

    if (!isOpen_func) return null

    return(
        <div>
            <div>{children}</div>
        </div>
    )
}

export default Popup_func
