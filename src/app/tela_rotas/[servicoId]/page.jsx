// app/tela_rotas/[servicoId]/page.js

'use client'
import Script from "next/script";
import { useRef, useState, useEffect } from "react";
import { useParams } from 'next/navigation';

export default function MapaPage() {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [rotaInfo, setRotaInfo] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Carregando mapa...");
  const params = useParams();
  const servicoId = params.servicoId;

  useEffect(() => {
    // Sai se o mapa não estiver carregado, se a API do Google não estiver disponível,
    // ou se não tivermos um ID de serviço.
    if (!isMapLoaded || !window.google || !mapRef.current || !servicoId) return;

    async function calculateAndDisplayRoute() {
      try {
        setStatusMessage("Buscando dados da rota...");
        
        // Passo 1: Buscar todos os dados da rota da nossa nova API
        const response = await fetch(`/api/servico/${servicoId}/rota-data`);
        const rotaData = await response.json();

        if (!response.ok) {
          // Se a resposta da API não for OK, lança um erro com a mensagem do backend
          throw new Error(rotaData.error || 'Falha ao buscar dados da rota.');
        }

        // Inicializa os serviços do Google Maps
        const { Map } = await google.maps.importLibrary("maps");
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

        const map = new Map(mapRef.current, {
          zoom: 12,
          center: rotaData.origin, // Centraliza o mapa na origem (garagem)
          mapId: 'DEMO_MAP_ID' // Opcional: para customização do mapa
        });

        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer({
            map: map,
            suppressMarkers: false, // Deixe true se quiser usar marcadores customizados
        });

        setStatusMessage("Calculando a rota otimizada...");

        // Passo 2: Montar a requisição para a API de Direções
        const request = {
          origin: rotaData.origin,
          destination: rotaData.destination,
          waypoints: rotaData.waypoints,
          optimizeWaypoints: true, // A MÁGICA ACONTECE AQUI! O Google otimiza a ordem das paradas.
          travelMode: google.maps.TravelMode.DRIVING,
        };

        // Passo 3: Enviar a requisição e processar a resposta
        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Calcula a distância e duração total da rota
            let distanciaTotal = 0;
            let duracaoTotal = 0;
            const rotaOtimizada = result.routes[0];
            rotaOtimizada.legs.forEach(leg => {
              distanciaTotal += leg.distance.value;
              duracaoTotal += leg.duration.value;
            });
            
            setRotaInfo({
              distancia: (distanciaTotal / 1000).toFixed(2) + ' km',
              duracao: Math.round(duracaoTotal / 60) + ' min',
              ordem: result.routes[0].waypoint_order // Ordem otimizada dos waypoints
            });

            setStatusMessage(""); // Limpa a mensagem de status

          } else {
            console.error("Erro ao calcular rota: " + status);
            setStatusMessage(`Erro do Google Maps: ${status}. Verifique se todos os endereços são válidos.`);
          }
        });

      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error);
        setStatusMessage(error.message);
      }
    }

    calculateAndDisplayRoute();
  }, [isMapLoaded, servicoId]); // Roda o efeito quando o mapa carregar ou o ID do serviço mudar

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Roteirizador Automático</h1>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps,routes&v=weekly`}
        onLoad={() => setIsMapLoaded(true)}
        strategy="afterInteractive"
      />
      <div className="w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden mb-6 border-2 border-blue-500">
        <div
            ref={mapRef}
            className="w-full h-[60vh]" // Altura do mapa
        />
      </div>
      
      {/* Exibição de Status e Informações da Rota */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-5xl text-center">
        {statusMessage && !rotaInfo && (
            <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-gray-300">{statusMessage}</p>
            </div>
        )}
        {rotaInfo && (
          <div>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Informações da Rota Otimizada</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
                <p className="text-lg text-gray-300 bg-gray-700 p-3 rounded">🚗 Distância Total: <span className="font-bold text-white">{rotaInfo.distancia}</span></p>
                <p className="text-lg text-gray-300 bg-gray-700 p-3 rounded">⏱ Duração Estimada: <span className="font-bold text-white">{rotaInfo.duracao}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
