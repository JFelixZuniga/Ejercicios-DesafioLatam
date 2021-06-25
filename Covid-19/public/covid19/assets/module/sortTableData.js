function sortDataByCountry(datos) {
  datos.sort(function (a, b) {
    if (a.location > b.location) {
      return 1;
    }
    if (a.location < b.location) {
      return -1;
    }
    return 0;
  });
  return datos;
}

function sortDataByActive(datos) {
  return datos.sort((a, b) => b.active - a.active);
}

function sortDataByConfirmed(datos) {
  return datos.sort((a, b) => b.confirmed - a.confirmed);
}

function sortDataByDeaths(datos) {
  return datos.sort((a, b) => b.deaths - a.deaths);
}

function sortDataByRecovered(datos) {
  return datos.sort((a, b) => b.recovered - a.recovered);
}

export {sortDataByCountry, sortDataByActive, sortDataByConfirmed, sortDataByDeaths, sortDataByRecovered}