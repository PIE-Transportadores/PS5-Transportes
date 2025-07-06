// /src/lib/geocode.ts

// --- TIPO PARA A FUNÇÃO ORIGINAL ---
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * FUNÇÃO ORIGINAL - NÃO MODIFICADA
 * Busca apenas as coordenadas (latitude e longitude) de um CEP.
 * Mantida para não quebrar outras partes do projeto.
 */
export async function getCoordinatesFromCEP(cep: string): Promise<Coordinates | null> {
  const token = process.env.AWESOME_API_TOKEN;
  if (!token) {
    console.error("Token da Awesome API não encontrado no .env");
    throw new Error("API token is missing.");
  }

  const sanitizedCep = cep.replace(/\D/g, '');
  if (sanitizedCep.length !== 8) return null;

  const url = `https://cep.awesomeapi.com.br/json/${sanitizedCep}?token=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();

    if (data.lat && data.lng) {
      return {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lng),
      };
    }
    return null;
  } catch (error) {
    console.error("Erro em getCoordinatesFromCEP:", error);
    return null;
  }
}


// --- TIPO PARA A NOVA FUNÇÃO ---
export interface AddressDetails {
  address: string;
  district: string;
  city: string;
  state: string;
}

/**
 * NOVA FUNÇÃO - PARA AUTO-PREENCHIMENTO
 * Busca os detalhes do endereço (rua, bairro, etc.) de um CEP.
 */
export async function getAddressDetailsFromCEP(cep: string): Promise<AddressDetails | null> {
  const token = process.env.AWESOME_API_TOKEN;
  if (!token) {
    console.error("Token da Awesome API não encontrado no .env");
    throw new Error("API token is missing.");
  }

  const sanitizedCep = cep.replace(/\D/g, '');
  if (sanitizedCep.length !== 8) return null;

  const url = `https://cep.awesomeapi.com.br/json/${sanitizedCep}?token=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();

    if (data.address && data.district) {
      return {
        address: data.address,
        district: data.district,
        city: data.city,
        state: data.state,
      };
    }
    return null;
  } catch (error) {
    console.error("Erro em getAddressDetailsFromCEP:", error);
    return null;
  }
}