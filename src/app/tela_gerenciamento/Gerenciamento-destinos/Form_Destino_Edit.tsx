'use client'
import React, { useEffect, useState, useTransition } from "react"
import Popup from "@/modal/modal_cadastro_destinos/popup"

async function buscarDestinoPorId(id: number) {
  const res = await fetch(`/api/destinos/${id}`)
  if (!res.ok) return null
  return await res.json()
}

async function atualizarDestino(id: number, dados: any) {
  const res = await fetch(`/api/destinos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
  return await res.json()
}

async function buscarEnderecoPorCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  if (!response.ok) return null
  return await response.json()
}

async function buscarLatLongPorEndereco(endereco: string) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`)
  const data = await response.json()
  if (data && data.length > 0) {
    return { latitude: data[0].lat, longitude: data[0].lon }
  }
  return { latitude: "", longitude: "" }
}

export default function Form_Destino_Edit({ id, isOpen, onClose, reabrirlista }: any) {
  const [destino, setDestino] = useState("")
  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [numero, setNumero] = useState("")
  const [cep, setCep] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [isPending, startTransition] = useTransition()
  const [erros, setErros] = useState<any>({})

  useEffect(() => {
    if (id && isOpen) {
      buscarDestinoPorId(id).then(data => {
        if (data) {
          setDestino(data.destino || "")
          setRua(data.rua || "")
          setBairro(data.bairro || "")
          setCidade(data.cidade || "")
          setEstado(data.estado || "")
          setNumero(data.numero?.toString() || "")
          setCep(data.cep || "")
          setLatitude(data.latitude?.toString() || "")
          setLongitude(data.longitude?.toString() || "")
        }
      })
    }
  }, [id, isOpen])

  // Preencher endereço automaticamente ao digitar o CEP
  useEffect(() => {
    if (cep.length === 8) {
      buscarEnderecoPorCep(cep).then(data => {
        if (data && !data.erro) {
          setRua(data.logradouro || "")
          setBairro(data.bairro || "")
          setCidade(data.localidade || "")
          setEstado(data.uf || "")
        }
      })
    }
  }, [cep])

  // Buscar latitude/longitude automaticamente quando endereço estiver completo
  useEffect(() => {
    if (rua && bairro && cidade && estado && numero && cep) {
      const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}, Brasil`
      buscarLatLongPorEndereco(enderecoCompleto).then(coords => {
        setLatitude(coords.latitude)
        setLongitude(coords.longitude)
      })
    }
  }, [rua, bairro, cidade, estado, numero, cep])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErros: any = {}
    if (!destino) newErros.destino = "Nome do destino é obrigatório"
    if (!rua) newErros.rua = "Rua é obrigatória"
    if (!bairro) newErros.bairro = "Bairro é obrigatório"
    if (!cidade) newErros.cidade = "Cidade é obrigatória"
    if (!estado) newErros.estado = "Estado é obrigatório"
    if (!numero || isNaN(Number(numero))) newErros.numero = "Número é obrigatório e deve ser um número"
    if (!cep) newErros.cep = "CEP é obrigatório"
    if (!latitude || isNaN(Number(latitude))) newErros.latitude = "Latitude é obrigatória e deve ser um número"
    if (!longitude || isNaN(Number(longitude))) newErros.longitude = "Longitude é obrigatória e deve ser um número"

    if (Object.keys(newErros).length > 0) {
      setErros(newErros)
      return
    }

    setErros({})
    startTransition(() => {
      atualizarDestino(id, {
        destino,
        rua,
        bairro,
        cidade,
        estado,
        numero: Number(numero),
        cep,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }).then(() => {
        alert("Destino atualizado com sucesso!")
        onClose()
        reabrirlista()
      })
    })
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Editar Destino</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome do Destino</label>
            <input
              type="text"
              name="destino"
              value={destino}
              onChange={e => setDestino(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.destino && <p className="text-red-400 text-sm mt-1">{erros.destino}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Rua</label>
            <input
              type="text"
              name="rua"
              value={rua}
              onChange={e => setRua(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Bairro</label>
            <input
              type="text"
              name="bairro"
              value={bairro}
              onChange={e => setBairro(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.cidade && <p className="text-red-400 text-sm mt-1">{erros.cidade}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Estado</label>
            <input
              type="text"
              name="estado"
              value={estado}
              onChange={e => setEstado(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              maxLength={2}
            />
            {erros.estado && <p className="text-red-400 text-sm mt-1">{erros.estado}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Número</label>
            <input
              type="number"
              name="numero"
              value={numero}
              onChange={e => setNumero(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">CEP</label>
            <input
              type="text"
              name="cep"
              value={cep}
              onChange={e => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              maxLength={8}
            />
            {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.latitude && <p className="text-red-400 text-sm mt-1">{erros.latitude}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {erros.longitude && <p className="text-red-400 text-sm mt-1">{erros.longitude}</p>}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          >
            {isPending ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </Popup>
  )
}