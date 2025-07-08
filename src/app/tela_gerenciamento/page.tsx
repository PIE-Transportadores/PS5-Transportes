'use client'
import { useState } from 'react'
import Viws_func from './Gerenciamento-funcionario/page'
import Viws_aloj from './Gerenciamento-alojamento/Viws_aloj'
import Viws_serv from './Gerenciamento-servico/page'
import Viws_garagem from './Gerenciamento-garagem/page'
import Viws_destino from './Gerenciamento-destinos/page'
import ModalVeiculos from '../componetes/cadastro_veiculos/modal_veiculos'
import Link from 'next/link'

// Ícones para o menu (componentes SVG simples)
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a2 2 0 01-2 2H4a2 2 0 110-4h12a2 2 0 012 2zM5 12a1 1 0 100 2h10a1 1 0 100-2H5z" clipRule="evenodd" /><path d="M2 5a1 1 0 011-1h14a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" /></svg>;
const GarageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M19.428 10.572a.5.5 0 00-.428-.428L11 8.854V4.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v4.354l-8-1.288a.5.5 0 00-.428.428L0 16.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-1.354l8 1.288a.5.5 0 00.428-.428L19 4.5a.5.5 0 00.428-3.928zM12 11.146v3.354a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-3.354l4.572-1.288-1.5-5.25L12 6.146v5z" clipRule="evenodd" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 21.07 5.05 16.02a7 7 0 010-11.97zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2H9z" /><path d="M4 9a2 2 0 012-2h1v10H6a2 2 0 01-2-2V9z" /><path d="M16 9a2 2 0 00-2-2h-1v10h1a2 2 0 002-2V9z" /></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" /></svg>;

export default function Tela_gerenciamento() {

    const [isOpen_func, setIsOpen_func] = useState(false)
    const [isOpen_aloj, setIsOpen_aloj] = useState(false)
    const [isOpen_veic, setIsOpen_veic] = useState(false)
    const [isOpen_gara, setIsOpen_gara] = useState(false)
    const [isOpen_dest, setIsOpen_dest] = useState(false)
    const [isOpen_serv, setIsOpen_serv] = useState(false)

    // Função para fechar todos os modais abertos
    const closeAllModals = () => {
        setIsOpen_func(false);
        setIsOpen_aloj(false);
        setIsOpen_veic(false);
        setIsOpen_gara(false);
        setIsOpen_dest(false);
        setIsOpen_serv(false);
    }

    // Função para abrir um modal específico e fechar os outros
    const openModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        closeAllModals();
        setter(true);
    }

    return (
        <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
            {/* Sidebar (Menu Lateral) */}
            <aside className="w-64 bg-slate-800 p-4 border-r border-slate-700 flex flex-col">
                <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl mr-3">
                        P
                    </div>
                    <h1 className="text-xl font-bold text-white">PIEEE</h1>
                </div>

                <nav className="flex-grow">
                    <button onClick={() => openModal(setIsOpen_func)} className="w-full flex items-center px-4 py-2.5 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <UserGroupIcon /> Funcionários
                    </button>
                    <button onClick={() => openModal(setIsOpen_aloj)} className="w-full flex items-center px-4 py-2.5 mt-2 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <HomeIcon /> Alojamentos
                    </button>
                    <button onClick={() => openModal(setIsOpen_veic)} className="w-full flex items-center px-4 py-2.5 mt-2 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <TruckIcon /> Veículos
                    </button>
                     <button onClick={() => openModal(setIsOpen_gara)} className="w-full flex items-center px-4 py-2.5 mt-2 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <GarageIcon /> Garagens
                    </button>
                    <button onClick={() => openModal(setIsOpen_dest)} className="w-full flex items-center px-4 py-2.5 mt-2 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <MapPinIcon /> Destinos
                    </button>
                    <button onClick={() => openModal(setIsOpen_serv)} className="w-full flex items-center px-4 py-2.5 mt-2 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <ClipboardIcon /> Serviços
                    </button>
                    <Link href='/componetes/Tela_cadastro' className="w-full flex items-center px-4 py-2.5 mt-2 text-sm text-left rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        <UserPlusIcon /> Cadastrar Usuário
                    </Link>
                </nav>

                <div className="mt-auto">
                    <div className="flex items-center p-2 rounded-lg bg-slate-700/50">
                        <img className="w-10 h-10 rounded-full mr-3" src="https://placehold.co/100x100/7e22ce/ffffff?text=JV" alt="User" />
                        <div>
                            <p className="font-semibold text-white text-sm">João Vitor</p>
                            <p className="text-xs text-slate-400">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>
            
            {/* Área de Conteúdo Principal */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                {/* Renderiza o componente de visualização apropriado com base no estado */}
                {isOpen_func && <Viws_func isOpen_func={isOpen_func} onClose_func={closeAllModals} />}
                {isOpen_aloj && <Viws_aloj isOpen_aloj={isOpen_aloj} onClose_aloj={closeAllModals} />}
                {isOpen_serv && <Viws_serv isOpen_serv={isOpen_serv} onClose_serv={closeAllModals} />}
                {isOpen_gara && <Viws_garagem isOpen_garagem={isOpen_gara} onClose_garagem={closeAllModals} />}
                {isOpen_dest && <Viws_destino isOpen_dest={isOpen_dest} onClose_dest={closeAllModals} />}
                {/* O ModalVeiculos é diferente, ele é um popup simples, não uma view de gerenciamento */}
                {isOpen_veic && <ModalVeiculos isOpen={isOpen_veic} onClose={closeAllModals} />}

                {/* Mensagem de Boas-Vindas quando nada está aberto */}
                {!isOpen_func && !isOpen_aloj && !isOpen_serv && !isOpen_gara && !isOpen_dest && !isOpen_veic && (
                     <div className="flex flex-col items-center justify-center h-full text-center">
                        <h2 className="text-4xl font-bold text-white">Bem-vindo ao Painel de Gerenciamento</h2>
                        <p className="mt-4 text-lg text-slate-400">Selecione uma opção no menu à esquerda para começar.</p>
                     </div>
                )}
            </main>
        </div>
    );
}
