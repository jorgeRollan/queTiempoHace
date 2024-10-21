import { useContext } from "react";

import SelectContext from "../../context/Contexts"


export default function SelectCities() {
    //states para datos del tiempo, ciudad del select el cargando y contexto del padre app para limpiar ubicacion

    let { selectCity, setSelectCity, setLoading } = useContext(SelectContext);


    //handle para pillar el select y ahora tambien el campo de busqueda de la city
    const handleChange = (event) => {
        let city = event.target.value;
        if (city !== selectCity) {
            setLoading(true);
            setSelectCity(city);
        }
    };

    return (
        <select name="select" value={selectCity} onChange={handleChange}>
            <>
                <option key='0' value="Madrid">Madrid</option>
                <option key='1' value="Zaragoza">Zaragoza</option>
                <option key='2' value="Huelva">Huelva</option>
                <option key='3' value="Toledo">Toledo</option>
                <option key='4' value="Murcia">Murcia</option>
            </>
        </select>
    )
}