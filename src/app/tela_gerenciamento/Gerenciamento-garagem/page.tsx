"use client"

import { useEffect, useState } from "react"
import Popup_garagem from "./pop-garagem"
import ModalGaragem from "@/app/componetes/cadastro_garagem/modal_garagem"
import Form_Garagem_Edit from "./Form_Garagem_Edit"
import { buscarGaragens } from "@/app/api/garagem/utils/BuscarGaragem"
import { getCoordinatesFromCEP } from "@/lib/geocode"  // Importando a função para obter coordenadas via Awesome API

interface Garagem {
  id: number
  garagem: string
  rua: string
  bairro: string
  numero: string
  cep: string
  latitude?: number  // Adicionando latitude e longitude ao tipo
  longitude?: number
}

export default function Viws_garagem({ isOpen_garagem, onClose_garagem }: any) {
  const [garagens, setGaragens] = useState<Garagem[]>([])
  const [isPopup, setIsPopup] = useState(false)
  const [isOpen_garagem1, setIsOpen_garagem1] = useState(isOpen_garagem)
  const [idEdicao, setIdEdicao] = useState<number | null>(null)
  const [mostrarEditar, setMostrarEditar] = useState(false)
  
  useEffect(() => {
    setIsOpen_garagem1(isOpen_garagem)
  }, [isOpen_garagem])

  async function carregar() {
    const data = await buscarGaragens()
    setGaragens(data)
  }

  useEffect(() => {
    carregar()
  }, [])

  const delete_garagem = async (id: number) => {
    const confirmado = window.confirm("Tem certeza que deseja excluir esta garagem?")
    if (!confirmado) return

    await fetch(`/api/garagem/${id}`, {
      method: "DELETE"
    })

    carregar()
  }

  return (
    <div>
      <Popup_garagem isOpen_garagem={isOpen_garagem1} onClose_garagem={() => setIsOpen_garagem1(false)}>
        <div className="overflow-y-auto max-h-[700px] rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-6">Garagens Cadastradas</h1>
            <div className="flex items-center gap-10">
              <button onClick={carregar}>
                <svg className="w-[45px] h-[45px] text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.223 14C4.13 18 7.72 21 12 21c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9C8.27 3 5.07 5.27 3.7 8.5M7 9H3V5" />
                </svg>
              </button>

              <button
                onClick={() => {
                  setIsPopup(true)
                  setIsOpen_garagem1(false)
                }}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                + Cadastrar
              </button>

              <button className="text-gray-400 hover:text-white text-xl" onClick={onClose_garagem}>
                ×
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="uppercase text-xs bg-gray-800 text-gray-400">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Rua</th>
                  <th className="px-6 py-3">Bairro</th>
                  <th className="px-6 py-3">Nº</th>
                  <th className="px-6 py-3">CEP</th>
                  <th className="px-6 py-3 text-center" colSpan={2}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {garagens.map((g) => (
                  <tr key={g.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="px-6 py-4">{g.garagem}</td>
                    <td className="px-6 py-4">{g.rua}</td>
                    <td className="px-6 py-4">{g.bairro}</td>
                    <td className="px-6 py-4">{g.numero}</td>
                    <td className="px-6 py-4">{g.cep}</td>
                    <td className="px-3 py-4">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                        onClick={() => {
                          setIdEdicao(g.id)
                          setMostrarEditar(true)
                          setIsOpen_garagem1(false)
                        }}
                      >
                        Editar
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        onClick={() => delete_garagem(g.id)}
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
      </Popup_garagem>

      <div className="flex-1 flex items-center justify-center relative">
        <ModalGaragem
          isOpen={isPopup}
          onClose={() => setIsPopup(false)}
          reabrirlista={() => setIsOpen_garagem1(true)}
        />
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        {idEdicao !== null && (
          <Form_Garagem_Edit
            id={idEdicao}
            isOpen={mostrarEditar}
            onClose={() => setMostrarEditar(false)}
            reabrirlista={() => setIsOpen_garagem1(true)}
          />
        )}
      </div>
    </div>
  )
}
