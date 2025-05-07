
'use client'
import './gerente.css'
import { useState } from 'react'

import ModalFuncionario from '../componetes/cadastro_funcionario/modal_funcionario'

export default  function Tela_gerenciamento(){

    const [isPopup,setIspopup] = useState(false)

    console.log("valor:",isPopup)

    return(
        <div className='container'>
            <div>
                <h1>Menu</h1> 
            </div>

            <div className="tela_gerenciamento">
                <button onClick={()=> setIspopup(true)}>Cadastro de Funcionario</button>
                <button>Cadastro de Alojamento</button>
                <button>Cadastro de Veiculos</button>
                <button>Cadastro de Garagem</button>
            </div>

            <ModalFuncionario isOpen = {isPopup} onClose = {()=> setIspopup(false)}/>
                 
        </div>
    )

}