const btnBuscar = document.querySelector("#btn-buscar");
const btnRandom = document.querySelector("#btn-random");
const inputHero = document.querySelector("#input-hero");

const imgHero = document.querySelector("#hero-img");

btnBuscar.addEventListener("click", async () => {
  const { value: idHeroe } = inputHero;

  if (idHeroe <= 0 || idHeroe > 732 || isNaN(idHeroe)) {
    // Creamos el DIV
    const divMensaje = document.createElement("div");
    // Le damos clases al DIV
    divMensaje.classList.add(
      "text-center",
      "alert-danger",
      "d-block",
      "col-12",
      "mt-3",
      "py-2"
    );
    // Insertamos el mensaje de error
    divMensaje.textContent = "Ingrese un ID entre el 1 y el 732";

    // Insertamos el DIV en el DOM
    const contenedor = document.querySelector("#mensajeError");
    console.log(divMensaje);

    contenedor.appendChild(divMensaje);

    // Quitar la alerta
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  } else {
    const datosHeroe = await conseguirHerore(idHeroe);

    const { image, name, powerstats, appearance, biography } = datosHeroe;

    const {
      "first-appearance": primeraAparicion,
      "full-name": nombrecompleto,
      "place-of-birth": nacimiento,
      aliases: alias,
    } = biography;

    const { height: altura, weight: peso } = appearance;

    let habilidad = Object.keys(powerstats);

    let poder = Object.values(powerstats);

    imgHero.style.backgroundImage = `url(${image.url})`;

    pintarTarjeta(
      name,
      idHeroe,
      nombrecompleto,
      nacimiento,
      alias,
      primeraAparicion,
      altura,
      peso
    );

    pintarGrafico(habilidad, poder, name);
  }
});

btnRandom.addEventListener("click", async () => {
  const numRandom = Math.floor(Math.random() * 732) + 1;

  const datosHeroe = await conseguirHerore(numRandom);

  const { image, name, powerstats, appearance, biography } = datosHeroe;

  const {
    "first-appearance": primeraAparicion,
    "full-name": nombrecompleto,
    "place-of-birth": nacimiento,
    aliases: alias,
  } = biography;

  const { height: altura, weight: peso } = appearance;

  let habilidad = Object.keys(powerstats);

  let poder = Object.values(powerstats);

  imgHero.style.backgroundImage = `url(${image.url})`;

  pintarTarjeta(
    name,
    numRandom,
    nombrecompleto,
    nacimiento,
    alias,
    primeraAparicion,
    altura,
    peso
  );

  pintarGrafico(habilidad, poder, name);
});

async function conseguirHerore(id) {
  const API_TOKEN = "316502013317398";

  const response = await fetch(
    `https://superheroapi.com/api.php/${API_TOKEN}/${id}`
  );
  const data = await response.json();
  return data;
}

function pintarTarjeta(
  name,
  numRandom,
  nombrecompleto,
  nacimiento,
  alias,
  primeraAparicion,
  altura,
  peso
) {
  const textoTarjeta = document.querySelector(".card-body");

  textoTarjeta.innerHTML = `
    <h5 class="card-title text-uppercase text-monospace">${name}</h5>
    <hr>
    <p class="card-text font-italic">ID: <span class="font-weight-light">${numRandom}</span></p>
    <hr>
    <p class="card-text font-italic">Nombre Completo: <span class="font-weight-light">${
      nombrecompleto == "-" ? "Desconocido" : nombrecompleto
    }</span></p>
    <hr />
    <p class="card-text font-italic">Lugar de Nacimiento: <span class="font-weight-light">${
      nacimiento == "-" ? "Desconocido" : nacimiento
    }</span></p>
    <hr />
    <p class="card-text font-italic">Alias: <span class="font-weight-light">${
      alias == "-" ? "Desconocido" : alias
    }</span></p>
    <hr />
    <p class="card-text font-italic">Primera Aparición: <span class="font-weight-light">${primeraAparicion}</span></p>
    <hr />
    <p class="card-text font-italic">Altura: <span class="font-weight-light">${
      altura[0]
    } - ${altura[1]}</span></p>
    <hr />
    <p class="card-text font-italic">Peso: <span class="font-weight-light">${
      peso[0]
    } - ${peso[1]}</span></p>
  `;
}

function pintarGrafico(datoUno, datoDos, name) {
  $("#myChart").remove();
  $("#grafico").append('<canvas id="myChart"></canvas>');
  const ctx = document.getElementById("myChart");

  const myChart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: datoUno,
      datasets: [
        {
          label: "Num datos",
          data: datoDos,
          backgroundColor: [
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 205, 86, 0.8)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Estadísticas de Poder para ${name}`,
        },
      },
    },
  });
}
