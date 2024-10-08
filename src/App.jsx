import { useState} from 'react';
import SelectCiudades from './components/SelectCiudades';
import CiudadUbicacion from './components/CiudadUbicacion';
import './App.css';

function App() {
  const [clean, setClean] = useState(false);

  const handleClean = (newClean) => {
    setClean(newClean);
  }

  return (
    <div>
      <h1>UNIT 1. API Weather</h1>
      {clean ? (
      <false />
    ):<CiudadUbicacion />}
    <SelectCiudades newSelect = {handleClean}/>
    </div>
  );
}

export default App;