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
    console.error('Error al obtener los datos del clima:', error);

  }
};

export default FetchUrl;