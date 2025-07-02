// /src/lib/geocode.ts

// Definimos uma interface para garantir que o retorno da nossa função seja sempre o mesmo
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Busca as coordenadas geográficas (latitude e longitude) de um CEP
 * utilizando a Awesome API.
 * @param cep O CEP a ser consultado (somente números).
 * @returns Um objeto com latitude e longitude, ou null se não for encontrado.
 */
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