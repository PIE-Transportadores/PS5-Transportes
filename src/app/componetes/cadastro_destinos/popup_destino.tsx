import React from "react"

interface ModalDestino {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}

const Popup_destino: React.FC<ModalDestino> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className="modal_destino">
            <div className="mini_modal_destino">
                <div className='conteudo_modal_destino'>{children}</div>
            </div>
        </div>
    )
}

export default Popup_destino