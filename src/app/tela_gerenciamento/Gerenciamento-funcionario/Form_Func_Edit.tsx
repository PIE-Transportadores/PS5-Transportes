import { useEffect, useState } from "react";
import { Popup_func_editar } from "./pop-func";
import { buscarFuncionarios } from "@/app/api/funcionarios/utils/BuscarFuncionario";

interface Props {
  id: number
  isOpen: boolean
  onClose: () => void
  reabrirlista: () => void
}

export default function Form_Func_Edit({id,isOpen,onClose , reabrirlista}:Props){

    const [isPending, setIsPending] = useState(false)
    const [dados,setDados] = useState ({})


    const [form,setForm] = useState({
        nome:"",
        cpf: "",
        turno:"",
        alojamento:""
    })

    useEffect(()=>{
       async function fetchData() {
        const res = await fetch(`/api/funcionarios/${id}`)
        const data = await res.json()
        setForm(data)
        }
        fetchData()
    },[id])

    async function carregar(){

      const data = await buscarFuncionarios()
      setDados(data)
    }

    useEffect(()=>{

        carregar()

    },[])



    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setForm({...form,[e.target.name]: e.target.value})
    }

    const handleSubmint = async (e: React.FormEvent)=>{
        e.preventDefault()
        setIsPending(true)

        const res = await fetch(`/api/funcionarios/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',

            },
            body: JSON.stringify(form),  
        })

        onClose();
        setIsPending(false)

    }

    return(

        <Popup_func_editar isOpen={isOpen} onCLose={onClose} >
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[550px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Editar Funcionário</h2>
                    <button onClick={()=>{onClose() , reabrirlista()}}
                    className="text-gray-400 hover:text-white text-xl">×</button>
                </div>

                <form onSubmit={handleSubmint} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Nome</label>
                        <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                    </div>

                    <div>
                        <label className="block text-sm mb-1">CPF</label>
                        <input
                        type="text"
                        name="cpf"
                        value={form.cpf}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Turno</label>
                        <select
                        name="turno"
                        value={form.turno}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="">Selecione o turno</option>
                        <option value="1° Turno">1° Turno</option>
                        <option value="2° Turno">2° Turno</option>
                        <option value="3° Turno">3° Turno</option>
                        </select>
                        
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Alojamento</label>
                        <select
                        name="alojamento"
                        value={form.alojamento}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="">Selecione o alojamento</option>
                        <option value="Alojamento 1">Alojamento 1</option>
                        <option value="Alojamento 2">Alojamento 2</option>
                        <option value="Alojamento 3">Alojamento 3</option>
                        </select>
                        
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        onClick={()=>{
                            setTimeout(()=>{
                                reabrirlista()
                                carregar()
                            },1300)

                        }}
                        
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
                    >
                        {isPending ? "Salvando..." : "Salvar alterações"}
                        
                    </button>
                </form>
            </div>
        
        </Popup_func_editar>
    )

}