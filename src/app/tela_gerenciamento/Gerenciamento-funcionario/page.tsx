"use client"
import { useEffect,useState } from "react"
import Popup_func from "./pop-func"
import ModalFuncionario from "@/app/componetes/cadastro_funcionario/modal_funcionario"


interface Funcionario{
    id: number
    nome: string
    cpf: string
    turno:string
    alojamento:string
}

export default  function Viws_func({isOpen_func,onClose_func}:any){

    const [funcionarios,setFuncionarios] = useState<Funcionario[]>([])
    const [isPopup,setIspopup] = useState(false)
    const [isOpen_func1, setIsOpen_func1] = useState(isOpen_func)
    console.log("O valor da 2º Pagina é", isOpen_func1)

    useEffect(() => {
    setIsOpen_func1(isOpen_func)
  }, [isOpen_func])

    useEffect(()=>{
        async function BuscarFuncionario(){

            const res = await fetch("/api/funcionarios")
            const data = await res.json()
            setFuncionarios(data)

        }
        BuscarFuncionario()
    },[])

    // Função para deletar um funcionario 

    const delete_funcionario = async(id: number)=>{
      
      await fetch(`/api/funcionarios/${id}`,{
        method:"DELETE"
      })
      
    }
  
   return (

    <div>
      <Popup_func isOpen_func = {isOpen_func1} onClose_func = {()=> setIsOpen_func1(false) }>
        <div className="overflow-y-auto max-h-[700px] rounded-lg">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-2xl font-bold text-white mb-6">Funcionários Cadastrados</h1>

            <button
              onClick={() => {
                setIspopup(true)
                setIsOpen_func1(false)
              }}
              className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              + Cadastrar
            </button>
            
          </div>
      

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="uppercase text-xs bg-gray-800 text-gray-400">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">CPF</th>
                  <th className="px-6 py-3">Turno</th>
                  <th className="px-6 py-3">Alojamento</th>
                  <th className="px-6 py-3 text-center" colSpan={2}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((func) => (
                  <tr key={func.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="px-6 py-4">{func.nome}</td>
                    <td className="px-6 py-4">{func.cpf}</td>
                    <td className="px-6 py-4">{func.turno}</td>
                    <td className="px-6 py-4">{func.alojamento}</td>
                    <td className="px-3 py-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">Editar</button>
                    </td>
                    <td className="px-3 py-4">
                      <button 
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        onClick={()=> delete_funcionario(func.id)}

                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </Popup_func>  

      <div className="flex-1 flex items-center justify-center relative">
          <ModalFuncionario 
            isOpen={isPopup} 
            onClose={() => setIspopup(false)} 
            reabrirlista = {()=>setIsOpen_func1(true)}
            />
        </div>
    </div>
   
  )

}