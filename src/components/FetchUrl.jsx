const FetchUrl = function(url,handleFunction){
  fetch(url)
  .then((response) => response.json())
  .then((data) => handleFunction(data))
  .catch((error) => console.error('Error al obtener los datos del clima:', error));
}

export default FetchUrl;