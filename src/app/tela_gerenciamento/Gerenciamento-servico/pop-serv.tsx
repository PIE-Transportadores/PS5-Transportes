import React from "react"

interface ModalFuncionario2{
    isOpen_serv:boolean,
    onClose_serv:()=> void,
    children:React.ReactNode
}

const Popup_serv: React.FC<ModalFuncionario2> = ({isOpen_serv,onClose_serv,children}) =>{

    if (!isOpen_serv) return null

    return(
        <div>
            <div>{children}</div>
        </div>
    )
}

interface ModalFuncioarioEditar{
    isOpen:boolean,
    onClose:()=> void,
    children:React.ReactNode

}

export const Popup_serv_editar: React.FC<ModalFuncioarioEditar> = ({isOpen,onClose,children})=>{
    if (!isOpen) return null

    return(
        <div>
            <div>{children}</div>
        </div>
    )
}
export default Popup_serv