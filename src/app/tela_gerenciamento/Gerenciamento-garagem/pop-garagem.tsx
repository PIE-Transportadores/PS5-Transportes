import React from "react";

interface ModalGaragemProps {
    isOpen_garagem: boolean
    onClose_garagem: () => void
    children: React.ReactNode
}

const Popup_garagem: React.FC<ModalGaragemProps> = ({ isOpen_garagem, onClose_garagem, children }) => {
    if (!isOpen_garagem) return null;
    return <div>{children}</div>;
};

interface ModalGaragemEditarProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export const Popup_garagem_editar: React.FC<ModalGaragemEditarProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return <div>{children}</div>;
};

export default Popup_garagem;