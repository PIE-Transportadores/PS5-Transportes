'use client'
import Script from "next/script";
import { useRef,useState,useEffect } from "react";

export default function MapaPage(){


    const mapRef = useRef(null)
    const [isLoaded,setIsloaded] = useState(false)
    const [rotaInfo,setRotaInfo] = useState (null)

    useEffect(()=>{

        
        if (!isLoaded || !window.google || !mapRef.current) return

        

        async function initmap() {

            const {Map} = await google.maps.importLibrary("maps")
            const {Marker} = await google.maps.importLibrary("marker")
            const {DirectionsService,DirectionsRenderer} = await google.maps.importLibrary("routes")
            

            const map = new Map (mapRef.current,{
                center: {lat: -23.55052,lng: -46.633308},
                zoom: 12,
            })

            const origin = {lat: -19.00088889, lng: -49.44374999}
            const destination = {lat: -18.990444, lng: -49.45175}

            const waypoints = [
                {location: {lat: -19.002, lng: -49.445},stopover:true},
                {location: {lat: -19.001, lng: -49.442},stopover:true},
                {location: {lat: -19.000, lng: -49.448},stopover:true}
            ]

            const directionsService = new google.maps.DirectionsService()
            const directionsRenderer =new google.maps.DirectionsRenderer()

            directionsRenderer.setMap(map)

            const request = {
                origin: origin,
                destination: destination,
                waypoints:waypoints,
                optimizeWaypoints:true,
                travelMode: google.maps.TravelMode.DRIVING,
            }

            directionsService.route(request,(result,status)=>{
                if (status === 'OK'){
                    directionsRenderer.setDirections(result)
                    const route = result.routes[0].legs[0];
                   setRotaInfo({
                    distancia: route.distance.text,
                    duracao: route.duration.text
                    })


                }else{
                    console.log("Erro ao calcular rota",status)
                }
            })
    
        }

        initmap()
    },[isLoaded])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

            <Script 
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly`}
            onLoad={() => setIsloaded(true)}
            strategy="afterInteractive"
            />

            <div 
            ref={mapRef} 
            className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg border border-gray-300 mb-6"
            />

            {rotaInfo && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informações da Rota</h2>
                <p className="text-lg text-gray-600">🚗 Distância: <span className="font-bold">{rotaInfo.distancia}</span></p>
                <p className="text-lg text-gray-600">⏱ Duração: <span className="font-bold">{rotaInfo.duracao}</span></p>
            </div>
            )}

        </div>
    )

}