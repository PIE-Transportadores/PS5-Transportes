import { useState, useEffect, startTransition } from 'react'
import Popup from "@/modal/modal_cadastro_garagem/popup"
import CriarGaragem from "@/action/service/garagem-service"
import { useActionState } from 'react'
import { getCoordinatesFromCEP } from "@/lib/geocode"  // Importando a função da nova API

const inicializarForm = { sucesso: false }

export default function ModalGaragem({ isOpen, onClose, reabrirlista }: any) {
  const [state, formAction] = useActionState(CriarGaragem, inicializarForm)

  const [nomeGaragem, setNomeGaragem] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [bairro, setBairro] = useState("")
  const [cep, setCep] = useState("")
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")

  useEffect(() => {
    if (state.sucesso === true && isOpen === true) {
      onClose()
      reabrirlista()
    } else {
      state.sucesso = false
    }
  }, [state.sucesso, onClose, reabrirlista])

  const obterCoordenadas = async () => {
    try {
      const coordinates = await getCoordinatesFromCEP(cep) // Usando a função da "Awesome API"
      
      if (coordinates) {
        setLatitude(coordinates.latitude.toString())  // Atualiza latitude
        setLongitude(coordinates.longitude.toString()) // Atualiza longitude
      } else {
        alert("Endereço não encontrado.")
      }
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error)
      alert("Erro ao obter coordenadas.")
    }
  }

  const salvarGaragem = () => {
    // Use startTransition para chamar funções assíncronas corretamente
    startTransition(() => {
      formAction({ nome_garagem: nomeGaragem, rua, numero, bairro, cep, latitude, longitude })
    })
  }
  
  return (
    <div className="modal_garagem">
      <Popup isOpen={isOpen} onClose={onClose}>
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-xl w-[700px] max-w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Cadastro de Garagem</h2>
          </div>

          <div>
            <div>
              <label className="block mb-2">Nome da Garagem</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full mb-4"
                value={nomeGaragem}
                onChange={(e) => setNomeGaragem(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Rua</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full mb-4"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Número</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full mb-4"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Bairro</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full mb-4"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">CEP</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full mb-4"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button
                onClick={obterCoordenadas}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Obter Coordenadas
              </button>
            </div>

            <div className="mb-4">
              <label className="block">Latitude</label>
              <input
                type="text"
                value={latitude}
                className="border border-gray-300 p-2 w-full mb-4"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block">Longitude</label>
              <input
                type="text"
                value={longitude}
                className="border border-gray-300 p-2 w-full mb-4"
                readOnly
              />
            </div>

            <div>
              <button
                onClick={salvarGaragem}
                className="bg-green-500 text-white p-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  )
}
