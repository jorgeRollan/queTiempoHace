import {useState} from 'react';
import SelectCiudades from './components/SelectCiudades';
import CiudadUbicacion from './components/CiudadUbicacion';
import CleanContext from './context/Clean';
import './App.css';

function App() {
  const [clean, setClean] = useState(false);

  const handleClean = () => {
    setClean(!clean);
  }

  return (
    <div>
      <h1>UNIT 1. API Weather</h1>
      {clean ? 
        <button onClick={handleClean}>Clima por ubicación</button>
       : <CiudadUbicacion />}
      <CleanContext.Provider value={handleClean}>
        <SelectCiudades />
      </CleanContext.Provider>
    </div>
  );
}

export default App;