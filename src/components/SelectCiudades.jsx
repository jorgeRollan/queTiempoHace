import { useEffect, useState } from "react";
import FetchUrl from "../api/FetchUrl";
import ShowWeather from "./ShowWeather";


export default function SelectCiudades({ newSelect }) {
  const [datos, setDatos] = useState(null);
  const [select, setSelect] = useState("Toledo");
  const [cargando, setCargando] = useState(false);
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;


  //handle para cuando cambio el valor del select tambien le paso el valor al componente padre
  const handleChange = (event) => {
    setCargando(!cargando);
    let ciudad = event.target.value;
    setSelect(ciudad);
    newSelect(ciudad);
  };

  const handleFetch = (newDatos) => {
    setDatos(newDatos);
    setCargando(!cargando);
  }

  const busquedaCiudad = (event) => {
    setCargando(!cargando);
    event.preventDefault();
    let ciudad = document.getElementById("busqueda").value;
    setSelect(ciudad);
    newSelect(ciudad);
  }

  useEffect(() => {
    if (select) {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + select + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, handleFetch);
    }
  }, [select]);

  return (
    <div id="select">
      <select name="select" value={select} onChange={handleChange}>
        <option value="Madrid">Madrid</option>
        <option value="Zaragoza">Zaragoza</option>
        <option value="Huelva">Huelva</option>
        <option value="Toledo">Toledo</option>
        <option value="Murcia">Murcia</option>
      </select>
      <div>
        <form>
          <label htmlFor="busqueda">Introduzca una ciudad</label>
          <input type="text" id="busqueda" name="busqueda"></input>
          <button onClick={busquedaCiudad}>Buscar</button>
        </form>
      </div>
      {!cargando ? <h2>Devolviendo datos del servidor</h2>: <ShowWeather datos={datos}/>}      
    </div> 
  )
}
