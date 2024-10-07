const ShowWeather = function (props) {
  return (
    <div id="datosDefecto">
      <h2>Clima en {props.datos.name}</h2>
      <p><strong>Temperatura:</strong> {props.datos.main.temp} °C</p>
      <p><strong>Sensación Térmica:</strong> {props.datos.main.feels_like} °C</p>
      <img src={`http://openweathermap.org/img/w/${props.datos.weather[0].icon}.png`} alt="wthr img" />
      <p><strong>Humedad:</strong> {props.datos.main.humidity} %</p>
      <p><strong>Descripción:</strong> {props.datos.weather[0].description}</p>
      <p><strong>Direccion del viento:</strong> {props.datos.wind.deg}</p>
      <p><strong>Velocidad del viento:</strong> {props.datos.wind.speed}</p>
      <p><strong>Presion atmosférica:</strong> {props.datos.main.pressure}</p>
    </div>
  )
}

export default ShowWeather;