import axios from 'axios'
const FetchUrl = async (url, handleFunction) => {
  try {
    const response = await axios.get(url);
    await handleFunction(response.data);
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);

  }
};

export default FetchUrl;