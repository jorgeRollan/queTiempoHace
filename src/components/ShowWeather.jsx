import * as Compass from 'cardinal-direction';
import { useContext } from 'react';
import DataContext from "../context/Contexts"

const ShowWeather = () => {
  const datos = useContext(DataContext);
  let { name, main: { temp, feels_like, humidity, pressure }, wind: { deg, speed }, weather } = datos
  return (
    <div id="datosDefecto">
      <h2>Clima en {name ?? "No disponible"}</h2>
      <p><strong>Temperatura:</strong> {temp ? `${Math.round(temp)} ºC` : "temperatura no disponible"}</p>
      <p><strong>Sensación Térmica:</strong> {feels_like ? `${Math.round(feels_like)} ºC` : "temperatura no disponible"}</p>
      <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt="icono del tiempo no disponible" />
      <p><strong>Humedad:</strong> {humidity ? `${humidity} %` : "humedad no disponible"}</p>
      <p><strong>Descripción:</strong> {weather[0].description ?? "descripción no disponible"}</p>
      <p><strong>Direccion del viento:</strong> {Compass.cardinalConverter(Compass.cardinalFromDegree(deg)) ?? "dirección del viento no disponible"}</p>
      <p><strong>Velocidad del viento:</strong> {speed ? `${speed} KM/H` : "velocidad del viento no disponible"}</p>
      <p><strong>Presion atmosférica:</strong> {pressure ? `${pressure} Bares` : "presión atmosférica no disponible"}</p>
    </div>
  )
}

export default ShowWeather;