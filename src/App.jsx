import { useState } from 'react';
import SelectCiudades from './components/SelectCiudades';
import CiudadUbicacion from './components/CiudadUbicacion';
import CleanContext from './context/Contexts';
import './App.css';

function App() {
  // estado para controlar si hay que quitar el panel de ubicacion o mostrarlo
  const [clean, setClean] = useState(false);

  const handleClean = () =>
    setClean(!clean);

  return (
    <div>
      <h1>UNIT 1. API Weather</h1>
      {clean ?
        <button onClick={[handleClean, clean]}>Clima por ubicación</button>
        : <CiudadUbicacion />}
      <CleanContext.Provider value={[handleClean,clean]}>
        <SelectCiudades />
      </CleanContext.Provider>
    </div>
  );
}

export default App;