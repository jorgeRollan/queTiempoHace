import { useEffect, useState, useContext } from "react";
import FetchUrl from "../api/FetchUrl";
import ShowWeather from "./ShowWeather";
import CleanContext from '../context/Contexts';
import DataContext from "../context/Contexts"


export default function SelectCiudades() {
  //states para datos del tiempo, ciudad del select el cargando y contexto del padre app para limpiar ubicacion
  const [datos, setDatos] = useState(null);
  const [select, setSelect] = useState("Toledo");
  const [cargando, setCargando] = useState(false);
  const [errorData, setErrorData] = useState(null)
  const newSelect = useContext(CleanContext);
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;


  //handle para pillar el select y ahora tambien el campo de busqueda de la ciudad
  const handleChange = (event) => {
    setCargando(!cargando);
    let ciudad = "";
    if (event.type === "change") {
        ciudad = event.target.value;
        if (ciudad !== select) {
            setSelect(ciudad);
            if (!newSelect[1]) {
                newSelect[0]();
            }
        }
    } 
    else if (event.type === "click") {
        event.preventDefault();
        ciudad = document.getElementById("busqueda").value;
        setSelect(ciudad);
        if (!newSelect[1]) {
            newSelect[0]();
        }
    }
};

  //handle para la devolucion de datos del fetch o gestion de error
  const handleFetch = (newDatos) => {
    //si error del fetch o codigo http distinto de 200
    if (newDatos === null || newDatos.cod !== 200) {
      setErrorData({ message: "No se han podido recuperar datos del tiempo" });
    }
    else {
      setDatos(newDatos);
    }
    //cargue los datos o falle hay que parar cargando
    setCargando(!cargando);
  }

  //use effect para llamar a fetch cuando cambia el select
  useEffect(() => {
    if (select !== null) {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + select + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, "GET", null, handleFetch);
    }
  }, [select]);

  // useffect para el estado error de datos
  useEffect(() => {
    if (errorData !== null) {
      window.alert(errorData.message);
    }
  }, [errorData]);

  return (
    <div id="select">
      <select name="select" value={select} onChange={handleChange}>
        <option value="Madrid">Madrid</option>
        <option value="Zaragoza">Zaragoza</option>
        <option value="Huelva">Huelva</option>
        <option value="Toledo">Toledo</option>
        <option value="Murcia">Murcia</option>
      </select>
      <>
        <form>
          <label htmlFor="busqueda">Introduzca una ciudad</label>
          <input type="text" id="busqueda" name="busqueda"></input>
          <button onClick={handleChange}>Buscar</button>
        </form>
      </>
      <DataContext.Provider value={datos}>
        {!cargando ? <h2>Devolviendo datos del servidor</h2> : <ShowWeather />}
      </DataContext.Provider>
    </div>
  )
}