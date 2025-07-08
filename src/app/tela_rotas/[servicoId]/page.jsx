// app/tela_rotas/[servicoId]/page.js

'use client'
import Script from "next/script";
import { useRef, useState, useEffect } from "react";
import { useParams } from 'next/navigation';

export default function MapaPage() {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null); // --- NOVO --- Estado para guardar a instância do mapa
    const [vehicleMarker, setVehicleMarker] = useState(null); // --- NOVO --- Estado para o marcador do veículo
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [rotaInfo, setRotaInfo] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Carregando mapa...");
    const params = useParams();
    const servicoId = params.servicoId;

    // --- NOVO --- Efeito para Rastreamento em Tempo Real do Veículo
    useEffect(() => {
        // Só roda se o mapa já estiver inicializado
        if (!map) return;

        // --- NOVO --- Cria um ícone de carro usando SVG. Você pode substituir por uma URL de imagem.
        const carIcon = {
            path: "M17.402 9.696l-3.402-5.696h-8l-3.402 5.696c-1.334 2.224-1.334 5.776 0 8l3.402 5.696h8l3.402-5.696c1.334-2.224 1.334-5.776 0-8zm-1.402 7.304h-10l-2-3h14l-2 3zm-1-4h-8l-2-3h12l-2 3z",
            fillColor: '#2563EB', // Cor azul
            fillOpacity: 1,
            strokeWeight: 0,
            rotation: 0,
            scale: 1.5,
            anchor: new google.maps.Point(10, 10), // Centraliza o ícone
        };

        // --- NOVO --- Cria o marcador do veículo uma única vez
        const marker = new google.maps.Marker({
            map: map,
            icon: carIcon,
            title: "Sua Localização"
        });
        setVehicleMarker(marker);

        // --- NOVO --- Inicia o rastreamento da posição
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                // Atualiza a posição do marcador do carro
                marker.setPosition(pos);
                
                // Centraliza o mapa na nova posição do carro
                map.setCenter(pos);
            },
            () => {
                // Trata erros de geolocalização (ex: usuário negou permissão)
                setStatusMessage("Não foi possível obter sua localização. Por favor, habilite a permissão.");
            },
            {
                enableHighAccuracy: true, // Pede a localização mais precisa possível (usa GPS)
                timeout: 5000,
                maximumAge: 0
            }
        );

        // --- NOVO --- Função de limpeza: para o rastreamento quando o componente for desmontado
        return () => {
            navigator.geolocation.clearWatch(watchId);
            marker.setMap(null); // Remove o marcador do mapa
        };

    }, [map]); // Este efeito depende apenas da instância do mapa


    // Efeito para carregar a rota (seu código original, com pequenas modificações)
    useEffect(() => {
        if (!isMapLoaded || !window.google || !mapRef.current || !servicoId) return;

        async function calculateAndDisplayRoute() {
            try {
                setStatusMessage("Buscando dados da rota...");
                const response = await fetch(`/api/servico/${servicoId}/rota-data`);
                const rotaData = await response.json();

                if (!response.ok) {
                    throw new Error(rotaData.error || 'Falha ao buscar dados da rota.');
                }

                const { Map } = await google.maps.importLibrary("maps");
                const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

                const initialMap = new Map(mapRef.current, {
                    zoom: 12,
                    center: rotaData.origin,
                    mapId: 'DEMO_MAP_ID'
                });
                setMap(initialMap); // --- NOVO --- Salva a instância do mapa no estado

                const directionsService = new DirectionsService();
                const directionsRenderer = new DirectionsRenderer({
                    map: initialMap,
                    suppressMarkers: false,
                });

                setStatusMessage("Calculando a rota otimizada...");
                const request = {
                    origin: rotaData.origin,
                    destination: rotaData.destination,
                    waypoints: rotaData.waypoints,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                };

                directionsService.route(request, (result, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(result);
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
                            ordem: result.routes[0].waypoint_order
                        });
                        setStatusMessage("");
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
    }, [isMapLoaded, servicoId]);

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
                    className="w-full h-[60vh]"
                />
            </div>
            
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
