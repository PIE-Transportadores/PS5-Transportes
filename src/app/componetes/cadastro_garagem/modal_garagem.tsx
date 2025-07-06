'use client'
import Popup from "@/modal/modal_cadastro_garagem/popup"
import React, { useEffect, useState, useTransition, useActionState } from "react"
import CriarGaragem from "@/action/service/garagem-service"
import { getAddressFromCepAction } from "@/action/cepAction"
import { getCoordinatesFromCEP } from "@/lib/geocode"

const inicializarForm = { sucesso: false, erro: null }

export default function ModalGaragem({ isOpen, onClose, reabrirlista }: { isOpen: boolean, onClose: () => void, reabrirlista: () => void }) {
  const [state, formAction] = useActionState(CriarGaragem, inicializarForm)
  const [isPending, startTransition] = useTransition()

  interface ErrosForm {
    nome?: string
    bairro?: string
    rua?: string
    numero?: string
    cep?: string
  }

  const [erros, setErrors] = useState<ErrosForm>({})

  // Campos controlados que podem ser auto-preenchidos
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [latitude, setLatitude] = useState<string>('')
  const [longitude, setLongitude] = useState<string>('')

  const [isFetchingCep, setIsFetchingCep] = useState(false)
  const [erroCep, setErroCep] = useState<string | null>(null)

  useEffect(() => {
    if (state.sucesso && isOpen) {
      onClose()
      reabrirlista()
    }
  }, [state.sucesso, onClose, isOpen, reabrirlista])

  /***
   * Ao sair do campo CEP, tenta buscar endereço (rua/bairro) + coordenadas.
   * Caso encontre, preenche os campos e foca no próximo input (número).
   */
  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {


    const form = event.currentTarget.form;
    const cepValue = event.target.value.replace(/\D/g, '');

    if (cepValue.length !== 8) {
      setErroCep("CEP inválido (deve conter 8 dígitos)");
      return;
    }

    setIsFetchingCep(true);
    setErroCep(null);

    const result = await getAddressFromCepAction(cepValue);
    console.log("Resultado da API de CEP:", result); // <--- Debug aqui

    setIsFetchingCep(false);

    if (result.success) {
      // Tente ajustar os campos se necessário
      setRua(result.data.address ?? '')
      setBairro(result.data.district ?? '')

      
      const numeroInput = form?.elements.namedItem('numero') as HTMLInputElement;
      numeroInput?.focus();
    } else {
      setErroCep(result.error || "CEP não encontrado");
      setRua("");
      setBairro("");
    }

    const coordinates = await getCoordinatesFromCEP(cepValue);
    if (coordinates) {
      setLatitude(coordinates.latitude.toString());
      setLongitude(coordinates.longitude.toString());
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const nome_garagem = formData.get('nome_garagem')?.toString().trim() ?? ''
    const numero = formData.get('numero')?.toString().trim() ?? ''
    const cepForm = formData.get('cep')?.toString().trim() ?? ''

    // Validação simples
    const newErrors: ErrosForm = {}
    if (!nome_garagem) newErrors.nome = 'Nome é obrigatório'
    if (!bairro) newErrors.bairro = 'Bairro é obrigatório'
    if (!numero) newErrors.numero = 'Número é obrigatório'
    if (!cepForm) newErrors.cep = 'CEP é obrigatório'
    if (!rua) newErrors.rua = 'Rua é obrigatória'

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    startTransition(() => {
      formAction({
        nome_garagem,
        rua,
        numero,
        bairro,
        cep: cepForm,
        latitude,
        longitude,
      })
    })
  }

  return (
    <div className="modal_garagem">
      <Popup isOpen={isOpen} onClose={onClose}>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-[700px] h-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-sans">Cadastro de Garagem</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                type="text"
                name="nome_garagem"
                placeholder="Garagem"
              />
              {erros.nome && <p className="text-red-400 text-sm mt-1">{erros.nome}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">CEP</label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                placeholder="CEP"
                name="cep"
                type="text"
                maxLength={9}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur}
              />
              {erros.cep && <p className="text-red-400 text-sm mt-1">{erros.cep}</p>}
              {erroCep && <p className="text-red-400 text-sm mt-1">{erroCep}</p>}
              {isFetchingCep && <p className="text-blue-400 text-sm mt-1">Buscando endereço...</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Rua</label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                placeholder="Rua"
                type="text"
                name="rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              {erros.rua && <p className="text-red-400 text-sm mt-1">{erros.rua}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Bairro</label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                type="text"
                name="bairro"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
              {erros.bairro && <p className="text-red-400 text-sm mt-1">{erros.bairro}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Número</label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                type="number"
                name="numero"
                placeholder="Número"
                min="1"
              />
              {erros.numero && <p className="text-red-400 text-sm mt-1">{erros.numero}</p>}
            </div>

            {/* Latitude e longitude somente leitura */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm mb-1">Latitude</label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                  type="text"
                  value={latitude}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Longitude</label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                  type="text"
                  value={longitude}
                  readOnly
                />
              </div>
            </div>

            <button
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition mt-4"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Salvando...' : 'Cadastrar'}
            </button>

            {state?.erro && <p className="text-red-400 text-sm mt-1">{state.erro}</p>}
          </form>
        </div>
      </Popup>
    </div>
  )
}