'use client'
import Popup from "@/modal/modal_cadastro_servico/popup"
import CriarServico from "@/action/service/servico-service"
import React, { useActionState, useEffect, useState, useTransition } from 'react'
import { buscarFuncionarios } from "@/app/api/funcionarios/utils/BuscarFuncionario"
<<<<<<< HEAD
=======
import Select from 'react-select'
>>>>>>> Joao-lira


const inicializarForm = { sucesso: false }

export default function ModalServico({ isOpen, onClose, reabrirlista }: any) {
  const [state, formAction] = useActionState(CriarServico, inicializarForm)
  const [isPending, startTransition] = useTransition()
  const [erros, setErros] = useState<any>({})

  const [funcionarios, setFuncionarios] = useState<any[]>([])
  const [destinos, setDestinos] = useState<any[]>([])

  useEffect(() => {
    const carregarDados = async () => {
      const listaFunc = await buscarFuncionarios()   
      setFuncionarios(listaFunc)
      
    }

    carregarDados()
  }, [])

  useEffect(() => {
    if (state.sucesso && isOpen) {
      onClose()
    } else {
      state.sucesso = false
    }
  }, [state.sucesso, onClose])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const nome = formData.get('nome')?.toString().trim() ?? ""
    const destino = formData.get('destino')?.toString().trim() ?? ""
    const dataInicio = formData.get('data_inicio')?.toString() ?? ""
    const dataFim = formData.get('data_fim')?.toString() ?? ""
    const funcionariosSelecionados = formData.getAll('funcionarios')

    const novosErros: any = {}

    if (!nome) novosErros.nome = "Nome do serviço é obrigatório"
    if (!destino) novosErros.destino = "Destino é obrigatório"
    if (!dataInicio) novosErros.data_inicio = "Data de início é obrigatória"
    if (!dataFim) novosErros.data_fim = "Data de fim é obrigatória"
    if (funcionariosSelecionados.length === 0) novosErros.funcionarios = "Selecione ao menos um funcionário"

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    setErros({})
    startTransition(() => {
      formAction(formData)
      alert("Serviço cadastrado com sucesso!")
    })
  }

<<<<<<< HEAD
=======
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: 'white',
      backgroundColor: state.isSelected ? '#2563eb' : '#1f2937', // Azul ou cinza escuro
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1f2937', // Cor do menu suspenso
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#1f2937',
      borderColor: '#4b5563',
      color: 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#2563eb',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
  }

  
>>>>>>> Joao-lira
  return (
    <div className="modal_servico">
      <Popup isOpen={isOpen} onClose={onClose}>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[600px] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Cadastrar Serviço</h2>
            <button onClick={() => {
              onClose()
              reabrirlista()
            }}
              className="text-gray-400 hover:text-white text-xl">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nome do Serviço</label>
              <input
                type="text"
                name="nome"
                placeholder="Nome do serviço"
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Destino</label>
              <select
                name="destino"
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
<<<<<<< HEAD
                <option value="">Selecione o destino</option>
                {destinos.map((dest) => (
                  <option key={dest.id} value={dest.nome}>
                    {dest.nome}
                  </option>
                ))}
=======
               <option value="selecione destino">
                opa
               </option>
>>>>>>> Joao-lira
              </select>
              {erros.destino && <p className="text-red-400 text-sm mt-1">{erros.destino}</p>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">Data Início</label>
                <input
                  type="date"
                  name="data_inicio"
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {erros.data_inicio && <p className="text-red-400 text-sm mt-1">{erros.data_inicio}</p>}
              </div>

              <div className="flex-1">
                <label className="block text-sm mb-1">Data Fim</label>
                <input
                  type="date"
                  name="data_fim"
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {erros.data_fim && <p className="text-red-400 text-sm mt-1">{erros.data_fim}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Funcionários</label>
<<<<<<< HEAD
              <select
                name="funcionarios"
                multiple
                className="w-full h-[100px] p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {funcionarios.map((func) => (
                  <option key={func.id} value={func.id}>
                    {func.nome}
                  </option>
                ))}
              </select>
=======
             
                <Select
                  isMulti
                  name="funcionarios"
                  options={funcionarios.map(f => ({ value: f.id, label: f.nome }))}
                  className="basic-multi-select"
                  styles={customStyles}
                />
>>>>>>> Joao-lira
              {erros.funcionarios && <p className="text-red-400 text-sm mt-1">{erros.funcionarios}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
              onClick={() => {
                setTimeout(() => {
                  reabrirlista()
                }, 2000)
              }}
            >
              {isPending ? 'Salvando...' : '+ Adicionar novo serviço'}
            </button>
          </form>
        </div>
      </Popup>
    </div>
  )
}
