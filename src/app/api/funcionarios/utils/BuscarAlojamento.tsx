

export default async function BuscarAlojamento(){

    const res = await fetch("/api/funcionarios/aloj")
    const data = await res.json()
    return data
    

}