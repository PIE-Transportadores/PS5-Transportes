export async function buscarServicos() {

    const res = await fetch("/api/servico");
    const data = await res.json();
    return data;
}