// /src/lib/geocode.ts

export interface Coordinates {
  latitude: number;
  longitude: number;
}


export async function getCoordinatesFromCEP(cep: string): Promise<Coordinates | null> {
  const token = process.env.AWESOME_API_TOKEN;
  if (!token) {
    console.error("Token da Awesome API não encontrado no .env");
    throw new Error("API token is missing.");
  }

  // A API espera o CEP sem o traço. Vamos garantir isso.
  const sanitizedCep = cep.replace(/\D/g, '');

  const url = `https://cep.awesomeapi.com.br/json/${sanitizedCep}?token=${token}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`API retornou erro ${response.status} para o CEP: ${cep}`);
      return null;
    }

    const data = await response.json();

    if (data.lat && data.lng) {
      // A API retorna lat/lng como string, convertemos para número
      return {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lng),
      };
    } else {
      console.warn(`Resposta da API para o CEP ${cep} não contém coordenadas.`);
      return null;
    }
  } catch (error) {
    console.error("Erro ao chamar a Awesome API:", error);
    return null;
  }
}