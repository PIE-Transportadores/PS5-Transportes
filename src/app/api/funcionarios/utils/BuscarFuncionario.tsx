

export async function buscarFuncionarios() {

    const res = await fetch("/api/funcionarios");
    const data = await res.json();
    return data;
}