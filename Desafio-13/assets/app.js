const inputNumeroDeJuegos = document.querySelector("#juegos");
const btnStart = document.querySelector("button");
const resultado = document.querySelector("#resultado");
const imgGanador = document.querySelector("#ganador");
const resultadoGanador = document.querySelector("#ganadorPerdedor");

btnStart.addEventListener("click", () => {
  const { value: cantidadDeJuegos } = inputNumeroDeJuegos;
  console.log(cantidadDeJuegos);

  validarCantidadDeJuegos(cantidadDeJuegos);

  var puntajetotal = 0;

  for (let i = 0; i < cantidadDeJuegos; i++) {
    const opcionDeUsuario = prompt(
      "Escriba su opción Piebra, Papel o Tijera"
    ).toLowerCase();

    const opcionDeMaquina = Math.floor(Math.random() * 3);

    const respuestaDeMaquina = transformarOpcionDeMaquina(opcionDeMaquina);

    const resultadoDeJugada = compararJugada(
      opcionDeUsuario,
      respuestaDeMaquina
    );

    if (resultadoDeJugada == 1) {
      puntajetotal += 1;
    } else if (resultadoDeJugada == -1) {
      puntajetotal -= 1;
    }

    resultado.innerHTML += `<li>Tu jugaste <span class="text-success">${opcionDeUsuario}</span> y la máquina jugó <span class="text-primary">${respuestaDeMaquina}</span></li>`;
  }

  if (puntajetotal == 0) {
    resultadoGanador.innerHTML = "Empataste";
    imgGanador.src = "https://i.ytimg.com/vi/VZjZnC3G_m8/maxresdefault.jpg";
  } else if (puntajetotal < 0) {
    resultadoGanador.innerHTML = "Perdiste";
    imgGanador.src =
      "https://www.chileallin.com/wp-content/uploads/2019/06/attachment-227.jpeg";
  } else if (puntajetotal > 0) {
    resultadoGanador.innerHTML = "Ganaste";
    imgGanador.src =
      "https://cdn.shopify.com/s/files/1/0740/0383/collections/Ganador_logo_1451ee15-f51d-4cf5-bec1-ba4ea80b0a32.jpg?v=1573595030";
  }
});

function validarCantidadDeJuegos(n) {
  if (n <= 0 || isNaN(n)) {
    alert("Favor ingrese un número de veces que desea jugar");
  }
}

function transformarOpcionDeMaquina(n) {
  if (n == 0) return "piedra";
  if (n == 1) return "papel";
  if (n == 2) return "tijera";
}

function compararJugada(n1, n2) {
  let punto = 0;
  if (n1 == n2) return punto;
  if (n1 == "piedra" && n2 == "tijera") return ++punto;
  if (n1 == "piedra" && n2 == "papel") return --punto;
  if (n1 == "papel" && n2 == "piedra") return ++punto;
  if (n1 == "papel" && n2 == "tijera") return --punto;
  if (n1 == "tijera" && n2 == "papel") return ++punto;
  if (n1 == "tijera" && n2 == "piedra") return --punto;
}
