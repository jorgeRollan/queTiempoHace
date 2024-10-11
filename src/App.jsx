import { useState } from 'react';
import SelectCiudades from './components/SelectCiudades';
import CiudadUbicacion from './components/CiudadUbicacion';
import CleanContext from './context/Contexts';
import './App.css';

function App() {
  // estado para controlar si hay que quitar el panel de ubicacion o mostrarlo lo cambio cuando elijo una ciudad del select o si pulso el boton ubicacion
  const [clean, setClean] = useState(false);

  const handleClean = () =>
    setClean(!clean);

  /*
  Pongo un context para pasar el clean y la funcion handle a selectCiudades
  si clean es true quito ciudadUbicacion y creo un boton para reactivar
  */
  return (
    <div>
      <h1>UNIT 1. API Weather</h1>

      {clean ?
        <button onClick={handleClean}>Clima por ubicación</button>
        : <CiudadUbicacion />}

      <CleanContext.Provider value={[handleClean, clean]}>
        <SelectCiudades />
      </CleanContext.Provider>
    </div>
  );
}

export default App;