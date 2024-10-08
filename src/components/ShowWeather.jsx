const ShowWeather = (props) =>{
  const {datos : {name, main:{temp, feels_like,humidity,pressure}, wind:{deg,speed}, weather}} = props
  return (
    <div id="datosDefecto">
      <h2>Clima en {name}</h2>
      <p><strong>Temperatura:</strong> {temp} °C</p>
      <p><strong>Sensación Térmica:</strong> {feels_like} °C</p>
      <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt="wthr img" />
      <p><strong>Humedad:</strong> {humidity} %</p>
      <p><strong>Descripción:</strong> {weather[0].description}</p>
      <p><strong>Direccion del viento:</strong> {deg}</p>
      <p><strong>Velocidad del viento:</strong> {speed}</p>
      <p><strong>Presion atmosférica:</strong> {pressure}</p>
    </div>
  )
}

export default ShowWeather;