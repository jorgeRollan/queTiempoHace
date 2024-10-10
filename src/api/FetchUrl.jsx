import axios from 'axios'
const FetchUrl = async (url, method, header, handleFunction) => {
  try {
    const response = await axios({
      url : url,
      method : method,
      header : header
    });
    await handleFunction(response.data);
  } catch (error) {
    if(error.status===404){
      window.alert("error 404 con la direccion introducida, compruebe que la ciudad elegida existe y hay conexion a internet")
      handleFunction(null);
    }
  }
};

export default FetchUrl;