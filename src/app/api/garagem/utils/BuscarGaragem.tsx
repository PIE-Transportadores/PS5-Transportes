export async function buscarGaragens() {
    const res = await fetch("/api/garagem");
    const data = await res.json();
    return data;
}
