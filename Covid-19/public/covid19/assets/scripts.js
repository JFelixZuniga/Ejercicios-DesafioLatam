const formulario = document.querySelector("form");
const btnLogout = document.querySelector("#logout");
const linkSituacionChile = document.querySelector("#situacionChile");
const linkHome = document.querySelector("#home");

const url = "http://localhost:3000/api/";

let totalDatosCovid;
let myChartChile;

document.addEventListener("DOMContentLoaded", async () => {
  totalDatosCovid = await getDataCovid();

  const primerosQuinceCasosActivos = await ordenarCasosActivos(totalDatosCovid);

  pintarGraficoInicial(primerosQuinceCasosActivos);
  pintarTabla(totalDatosCovid);
  modalGraficoDePais();
});

async function getDataCovid() {
  const url = "http://localhost:3000/api/total";
  const response = await fetch(url);
  const { data } = await response.json();
  return data;
}

async function ordenarCasosActivos(datos) {
  return datos.sort((a, b) => b.active - a.active).slice(0, 15);
}

function pintarGraficoInicial(data) {
  const ctx = document.getElementById("myChart");

  const cfg = {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Casos activos",
          data: data,
          parsing: {
            yAxisKey: "active",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(255, 99, 132, 0.8)"],
        },
        {
          label: "Casos confirmados",
          data: data,
          parsing: {
            yAxisKey: "confirmed",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(255, 205, 86, 0.8)"],
        },
        {
          label: "Casos muertos",
          data: data,
          parsing: {
            yAxisKey: "deaths",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(153, 102, 255, 0.8)"],
        },
        {
          label: "Casos recuperados",
          data: data,
          parsing: {
            yAxisKey: "recovered",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(75, 192, 192, 0.8)"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, cfg);
}

pintarTabla = (data) => {
  $(".detallePais").remove();

  const tabla = document.querySelector("tbody");

  data.forEach(({ location, active, confirmed, deaths, recovered }) => {
    const row = document.createElement("tr");
    row.classList.add("detallePais");
    row.innerHTML += `
      <td>${location}</td>
      <td>${Number(active).toLocaleString()}</td>
      <td>${Number(confirmed).toLocaleString()}</td>
      <td>${Number(deaths).toLocaleString()} </td>
      <td>${Number(recovered).toLocaleString()}</td>
      <td>
        <button
          class="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          onclick="modalGraficoDePais('${location}')"
        >Ver Gráfico
      </button>
      </td>
    `;
    tabla.appendChild(row);
  });

  $("#tablaMain").DataTable({
    //para cambiar el lenguaje a español
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      sSearch: "Buscar:",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      sProcessing: "Procesando...",
    },
  });
};

async function modalGraficoDePais(pais) {
  const totalDatosCovid = await getDataCovid();

  const datosDelPaisFiltrado = totalDatosCovid.filter((dato) => {
    if (dato.location == pais) return dato;
  });

  pintarGraficoPorPaisIndividual(datosDelPaisFiltrado);
}

function pintarGraficoPorPaisIndividual(data) {
  $("#myChartIndividual").remove();
  $("#grafico-por-pais").append('<canvas id="myChartIndividual"></canvas>');
  const ctx = document.getElementById("myChartIndividual");

  const cfg = {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Casos activos",
          data: data,
          parsing: {
            yAxisKey: "active",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(255, 99, 132, 0.8)"],
        },
        {
          label: "Casos confirmados",
          data: data,
          parsing: {
            yAxisKey: "confirmed",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(255, 205, 86, 0.8)"],
        },
        {
          label: "Casos muertos",
          data: data,
          parsing: {
            yAxisKey: "deaths",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(153, 102, 255, 0.8)"],
        },
        {
          label: "Casos recuperados",
          data: data,
          parsing: {
            yAxisKey: "recovered",
            xAxisKey: "location",
          },
          backgroundColor: ["rgba(75, 192, 192, 0.8)"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, cfg);
}

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  $("#loginModal").modal("hide");

  const [email, password] = [...document.querySelectorAll("input")].map(
    (i) => i.value
  );

  const userCredentials = { email, password };

  const JWT = await sendDataloginForToken(userCredentials);

  printAlertLogin("Iniciaste sesión satisfactoriamente.");

  const totalDataChile = await Promise.all([
    getDataCovidChileConfirmed(JWT),
    getDataCovidChileDeaths(JWT),
    getDataCovidChileRecovered(JWT),
  ]).then((dataChile) => {
    if (dataChile)
      localStorage.setItem("AllDataChile", JSON.stringify(dataChile));
    $("#spinner").addClass("d-none");
    return dataChile;
  });

  pintarGraficoChile(totalDataChile);
});

linkSituacionChile.addEventListener("click", () => {
  toggleFormAndTable("contenidoGenealMain", "contenidoChileMain");
  toggleFormAndTable("situacionChile", "home");
});

linkHome.addEventListener("click", () => {
  toggleFormAndTable("contenidoGenealMain", "contenidoChileMain");
  toggleFormAndTable("situacionChile", "home");
});

const sendDataloginForToken = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { token } = await response.json();
    localStorage.setItem("JWToken", token);
    if (token) toggleFormAndTable("login", "situacionChile", "logout");
    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

function printAlertLogin(mensaje) {
  const divMensaje = document.createElement("div");
  divMensaje.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show"
  );

  divMensaje.textContent = mensaje;

  document.querySelector("#mensajeLogin").appendChild(divMensaje);

  setTimeout(() => {
    divMensaje.remove();
  }, 3000);
}

async function getDataCovidChileConfirmed(jwt) {
  const url = "http://localhost:3000/api/";
  try {
    const response = await fetch(`${url}confirmed`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
}

async function getDataCovidChileDeaths(jwt) {
  try {
    const response = await fetch(`${url}deaths`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
}

async function getDataCovidChileRecovered(jwt) {
  const url = "http://localhost:3000/api/";
  try {
    const response = await fetch(`${url}recovered`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
}

function pintarGraficoChile(data) {
  if (myChartChile) myChartChile.destroy();

  const ctx = document.getElementById("myChartChile");

  const cfg = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Confirmados",
          data: data[0],
          parsing: {
            yAxisKey: "total",
            xAxisKey: "date",
          },
          backgroundColor: ["rgba(255, 205, 86, 0.8)"],
        },
        {
          label: "Muertos",
          data: data[1],
          parsing: {
            yAxisKey: "total",
            xAxisKey: "date",
          },
          backgroundColor: ["rgba(153, 102, 255, 0.8)"],
        },
        {
          label: "Recuperados",
          data: data[2],
          parsing: {
            yAxisKey: "total",
            xAxisKey: "date",
          },
          backgroundColor: ["rgba(75, 192, 192, 0.8)"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    },
  };

  myChartChile = new Chart(ctx, cfg);
}

const toggleFormAndTable = (login, menu, logout) => {
  $(`#${login}`).toggle();
  $(`#${menu}`).toggle();
  $(`#${logout}`).toggle();
};

btnLogout.addEventListener("click", () => {
  localStorage.clear();
  toggleFormAndTable("login", "situacionChile", "logout");

  $("#home").hide();
  $("#situacionChile").hide();
  $("#contenidoChileMain").hide();
  $("#contenidoGenealMain").show();
  $("#myChartChile").remove();
  $("#spinner").removeClass("d-none");
  $("#graficoChile").append('<canvas id="myChartChile"></canvas>');
  printAlertLogin("Cerraste sesión satisfactoriamente.");
});

const init = async () => {
  const token = localStorage.getItem("JWToken");
  if (token) {
    $("#spinner").addClass("d-none");
    toggleFormAndTable("login", "situacionChile", "logout");

    let allDataChile = await JSON.parse(localStorage.getItem("AllDataChile"));

    pintarGraficoChile(allDataChile);
  }
};

init();
