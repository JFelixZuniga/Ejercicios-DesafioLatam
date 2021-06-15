const getAlbumes = async (id) => {
  const url = "https://jsonplaceholder.typicode.com/photos";
  try {
    const response = await fetch(url);
    const albumes = await response.json();

    const albumesSegunIdRecibido = albumes.filter((a) => a.albumId == id);

    const primerosVeinteAlbumes = albumesSegunIdRecibido.slice(0, 19);

    return primerosVeinteAlbumes;
  } catch (error) {
    console.log(error);
  }
};

const enviarInformacion = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Información enviada");
    }, 3000);
  });
};

(async () => {
  const respuestaSegundaFuncion = await enviarInformacion();
  const respuestaPrimeraFuncion = await getAlbumes(2);
  console.log(respuestaPrimeraFuncion);
  console.log(respuestaSegundaFuncion);
})();
