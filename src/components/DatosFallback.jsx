import * as Compass from 'cardinal-direction';

const DatosFallback = (datos) => {
    let { name, main: { temp, feels_like, humidity, pressure }, wind: { deg, speed }, weather } = datos
    name = name || "Nombre no disponible";
    feels_like = feels_like ? `${Math.round(feels_like)} ºC` : "temperatura no disponible";
    humidity = humidity ? `${humidity} %` : "humedad no disponible";
    weather[0].description = weather[0].description ?? "descripción no disponible"
    deg = Compass.cardinalConverter(Compass.cardinalFromDegree(deg)) ?? "dirección del viento no disponible"
    speed = speed ? `${speed} KM/H` : "velocidad del viento no disponible"
    pressure = pressure ? `${pressure} Bares` : "presión atmosférica no disponible"
    return  { name, main: { temp, feels_like, humidity, pressure }, wind: { deg, speed }, weather } 
}

export default DatosFallback;