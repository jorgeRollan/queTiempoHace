import axios from 'axios'
//he puesto tres parametros de momento(no uso la cabecera de momento)
const FetchUrl = async (url, method, header, handleFunction) => {
  try {
    const response = await axios({
      url : url,
      method : method,
      header : header
    });
    if(await response.data.cod===200){
      handleFunction(response.data);
    }
    else throw new Error(`Error en la obtencion url ${response.data.cod}`);
  }
  //asntes trataba aqui los errores del fetch pero los he propagado arriba para que los gestione el handle de select o ubicacion
  catch (error) {
      window.alert(error.message);
  }
};

export default FetchUrl;