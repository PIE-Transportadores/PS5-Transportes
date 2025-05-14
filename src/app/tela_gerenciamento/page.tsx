
'use client'
import './gerente.css'
import { useState } from 'react'

import ModalFuncionario from '../componetes/cadastro_funcionario/modal_funcionario'

export default  function Tela_gerenciamento(){

    const [isPopup,setIspopup] = useState(false)

    console.log("valor:",isPopup)

    return(
        <div className='container'>
           
            <div className="tela_gerenciamento">
                <h1>Menu</h1>
                <button onClick={()=> setIspopup(true)}>Cadastro de Funcionario</button>
                <button>Cadastro de Alojamento</button>
                <button>Cadastro de Veiculos</button>
                <button>Cadastro de Garagem</button>
            </div>

            <div className='modal_func'>
                <ModalFuncionario isOpen = {isPopup} onClose = {()=> setIspopup(false)}/>
           </div>
            
                 
        </div>
    )

}