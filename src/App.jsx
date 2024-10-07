import { useState} from 'react';
import SelectCiudades from './components/SelectCiudades';
import CiudadUbicacion from './components/CiudadUbicacion';
import './App.css';

function App() {
  const [select, setSelected] = useState(false);

  const handleSelect = (newSelect) => {
    setSelected(newSelect);
  }

  return (
    <div>
      <h1>UNIT 1. API Weather</h1>
      {select ? (
      <false />
    ):<CiudadUbicacion />}
      <SelectCiudades newSelect = {handleSelect}/>
    </div>
  );
}

export default App;