export async function buscarDestinos() {
  const res = await fetch('/api/destinos')
  return await res.json()
}