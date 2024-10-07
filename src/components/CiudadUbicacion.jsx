import { useEffect, useState } from "react";
import FetchUrl from './FetchUrl';
import ShowWeather from "./ShowWeather";

export default function CiudadUbicacion() {
    const [datos, setDatos] = useState(null);
    const [position, setPosition] = useState(null);
    const apiId = '';
    
    //posicion del navegador
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setPosition(pos),
          (error) => console.error("Error al obtener la geolocalización:", error)
        );
      } else {
        console.error("Geolocalización no soportada por el navegador");
      }
    }, []);
  
    const handleFetch = (newDatos)=>{
        setDatos(newDatos)
    }

    //fetch de la ciudad del navegador
    useEffect(() => {
      if (position) {
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid='+apiId+'&units=metric';
        FetchUrl(url,handleFetch)
    }
    }, [position]);
  
    return (
      <div>
        {datos ? (
          <ShowWeather datos={datos} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    );
  }
