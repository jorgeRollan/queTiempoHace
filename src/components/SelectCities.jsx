import { useEffect, useState, useContext } from "react";
import FetchUrl from "../api/FetchUrl";
import ShowWeather from "./ShowWeather";
import CleanContext from '../context/Contexts';
import DataContext from "../context/Contexts"
import DataFallback from "./DataFallback";


export default function SelectCities() {
  //states para datos del tiempo, ciudad del select el cargando y contexto del padre app para limpiar ubicacion
  const [weatherData, setWeatherData] = useState(null);
  const [selectCity, setSelectCity] = useState("Toledo");
  const [loading, setLoading] = useState(false);
  const [errorWeatherData, setErrorWeatherData] = useState(null);

  const newSelectCity = useContext(CleanContext);
  
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;


  //handle para pillar el select y ahora tambien el campo de busqueda de la city
  const handleChange = (event) => {
    setLoading(!loading);
    let city = "";
    if (event.type === "change") {
      city = event.target.value;
      if (city !== selectCity) {
        setSelect(city);
        if (!newSelectCity[1]) {
          newSelectCity[0]();
        }
      }
    }
    else if (event.type === "click") {
      event.preventDefault();
      city = document.getElementById("search").value;
      setSelectCity(city);
      if (!newSelectCity[1]) {
        newSelectCity[0]();
      }
    }
  };

  //handle para la devolucion de datos del fetch o gestion de error
  const handleFetch = (newWeatherData) => {
    //si codigo http distinto de 200
    if (newWeatherData.cod !== 200) {
      setErrorWeatherData({ message: `error  ${newWeatherData.cod} No se han podido recuperar datos del tiempo` });
    }
    else {
      //le paso datos por props porque no quiero que se carguen a la vez en showWeather como context 
      setWeatherData(DataFallback(newWeatherData));
    }
    //cargue los datos o falle hay que parar cargando
    setLoading(!loading);
  }

  //use effect para llamar a fetch cuando cambia el SelectCity
  useEffect(() => {
    if (selectCity !== null) {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + selectCity + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, "GET", null, handleFetch);
    }
  }, [selectCity]);
  
  // useffect para el estado error de datos
  useEffect(() => {
    if (errorWeatherData !== null) {
      window.alert(errorWeatherData.message);
    }
  }, [errorWeatherData]);

  return (
    <div id="selectCity">
      <select name="select" value={selectCity} onChange={handleChange}>
        <option value="Madrid">Madrid</option>
        <option value="Zaragoza">Zaragoza</option>
        <option value="Huelva">Huelva</option>
        <option value="Toledo">Toledo</option>
        <option value="Murcia">Murcia</option>
      </select>
      <>
        <form>
          <label htmlFor="search"></label>
          <input type="text" id="search" name="search" placeholder="Introduzca una ciudad"></input>
          <button onClick={handleChange}>Buscar</button>
        </form>
      </>


      <DataContext.Provider value={weatherData}>
        {!loading ? <h2>Devolviendo datos del servidor</h2> : <ShowWeather />}
      </DataContext.Provider>


    </div>
  )
}