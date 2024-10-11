import { useContext, useEffect, useState } from "react";
import FetchUrl from '../api/FetchUrl';
import ShowWeather from "./ShowWeather";
import DataContext from "../context/Contexts"
import CleanContext from "../context/Contexts";

export default function CiudadUbicacion() {
  const [datos, setDatos] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorLocation, setErrorLocaction] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [cargando, setCargando] = useState(false);

  const clean = useContext(CleanContext);
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;

  //posicion del navegador he puesto el setinterval para que actualice la ubicacion cada x ms(he puesto 10 de momento) llamo a la funcion primero para evitar el delay la primera vez(?)
  useEffect(() => {
    obtenerUbicacion();
    const intervalo = setInterval(() => {
      obtenerUbicacion();
    }, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const handleFetch = (newDatos) => {
    if (newDatos.cod !== 200) {
      setErrorData({ message: "No se han podido recuperar datos del tiempo" });
    }
    else {
      setDatos(newDatos);
      setCargando(!cargando);
    }
  }

  //fetch de la ciudad del navegador
  useEffect(() => {
    if (position) {
      setCargando(!cargando);
      const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, "GET", null, handleFetch);
    }
  }, [position]);


  // useffect para el estado error de localizacion
  useEffect(() => {
    if (errorLocation !== null) {
      window.alert(errorLocation.message);
    }
  }, [errorLocation]);

  // useffect para el estado error de datos
  useEffect(() => {
    if (errorData !== null) {
      window.alert(errorData.message);
    }
  }, [errorData]);


  //he sacado fuera la constante que estaba en el useffect para llamarla 2 veces
  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition(pos),
        (error) => setErrorLocaction(error)
      );
    } else {
      setErrorLocaction({ message: "Geolocalización no soportada por el navegador" });
    }
  }


  if (!cargando) {
    return (
      <h2>Devolviendo datos del servidor</h2>)
  }

  if (datos) {
    return (
      <div>
        {clearInterval()}
        <DataContext.Provider value={datos}>
          <ShowWeather />
        </DataContext.Provider>
      </div>
    )
  }
}