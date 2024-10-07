import { useEffect, useState } from "react";
import FetchUrl from "./FetchUrl";
import ShowWeather from "./ShowWeather";


export default function SelectCiudades({ newSelect }) {
  const [datos, setDatos] = useState(null);
  const [select, setSelect] = useState("Toledo");
  const apiId = '';


  //handle para cuando cambio el valor del select tambien le paso el valor al componente padre
  const handleChange = (event) => {
    setSelect(event.target.value);
    newSelect(select);
  };


  const handleFetch = (newDatos) => {
    setDatos(newDatos)
  }

  useEffect(() => {
    if (select) {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + select + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, handleFetch)
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

      {datos ? (
        <ShowWeather datos={datos} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
