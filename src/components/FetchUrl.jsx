const FetchUrl = async (url, handleFunction) => {
  try {
    window.alert(url);
    const response = await fetch(url);
    const data = await response.json();
    await handleFunction(data);
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);

  }
};

export default FetchUrl;