import { useEffect, useState } from "react";
import FetchUrl from './FetchUrl';
import ShowWeather from "./ShowWeather";

export default function CiudadUbicacion() {
  const [datos, setDatos] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorLocation, setErrorLocaction] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;

  //posicion del navegador
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition(pos),
        (error) => setErrorLocaction(error)
      );
    } else {
      setErrorLocaction("Geolocalización no soportada por el navegador");
    }
  }, []);

  const handleFetch = (newDatos) => {
    setDatos(newDatos)
  }

  //fetch de la ciudad del navegador
  useEffect(() => {
    if (position) {
      const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, handleFetch)
    }
  }, [position]);


  // useffect para el estado error de localizacion
  useEffect(() => {
    if (errorLocation != null) {
      window.alert(errorLocation.message);
    }
  }, [errorLocation]);

  // useffect para el estado error de datos del tiempo
  useEffect(() => {
    if (errorLocation != null) {
      setErrorData("No se puede recuperar datos porque hay problema de ubicación");
      window.alert(setErrorData);
    }
    else {
      if (datos == null) {
        setErrorData("No se han podido recuperar datos del tiempo");
        window.alert(setErrorData);
      }
    }
  }, [errorData]);


  if (datos) {
    return (
      <div>
        <ShowWeather datos={datos} />
      </div>
    )
  }
}
