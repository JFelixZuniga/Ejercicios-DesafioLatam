// Capturamos los datos del usuario (nombre y carrera)
var nombreEstudiante = prompt("Favor ingrese su nombre");
var nombreCarrera = prompt(`${nombreEstudiante}, favor ingrese su carrera`);

// Insertamos los datos del usuario en el Html
document.querySelector("#nombre").innerHTML = nombreEstudiante;
document.querySelector("#carrera").innerHTML = nombreCarrera;

// Creamos un arreglo que contendra los datos
var totalDatosIngresados = [];

for (var i = 0; i < 3; i++) {
  // Para el tercer Ramo ingresado (Javascript)
  if (i == 2) {
    var nombreRamo = prompt(`Favor ingrese el nombre del ramo`);
    var notaPrimera = +prompt(`Favor ingrese 1ra nota del ramo ${nombreRamo}`);
    var notaSegunda = +prompt(`Favor ingrese 2da nota del ramo ${nombreRamo}`);
    var notaTercera = " - ";
    var promedio = " - ";

    // Calculamos la nota 3 pendiente para aprobar el tercer ramo
    var notaPendiente = (4 * 3 - notaPrimera - notaSegunda).toFixed(2);
  } else {
    var nombreRamo = prompt(`Favor ingrese el nombre del ramo`);
    var notaPrimera = +prompt(`Favor ingrese 1ra nota del ramo ${nombreRamo}`);
    var notaSegunda = +prompt(`Favor ingrese 2da nota del ramo ${nombreRamo}`);
    var notaTercera = +prompt(`Favor ingrese 3ra nota del ramo ${nombreRamo}`);

    // Hacemos la operación de promedio de las notas
    var promedio = ((notaPrimera + notaSegunda + notaTercera) / 3).toFixed(2);
  }

  // Guardamos los datos de cada Ramo en un objeto
  var datosRamo = new Object({
    nombre: nombreRamo,
    notaUno: notaPrimera,
    notaDos: notaSegunda,
    notaTres: notaTercera,
    notaPromedio: promedio,
  });

  // El objeto creado con los datos de cada ramo lo agregamos a un Array de objetos
  totalDatosIngresados.push(datosRamo);
  console.log(totalDatosIngresados);
}

const tabla = document.querySelector("tbody");

// Iteramos sobre el Array de objetos
totalDatosIngresados.forEach(
  ({ nombre, notaUno, notaDos, notaTres, notaPromedio }) => {
    const row = document.createElement("tr");
    row.innerHTML += `
      <td class="font-weight-bold">${nombre}</td>
      <td>${notaUno}</td>
      <td>${notaDos}</td>
      <td>${notaTres}</td>
      <td>${notaPromedio}</td>
      `;
    // Insertamos dentro de la tabla la fila con información
    tabla.appendChild(row);
  }
);

// Validamos que la nota necesaria no sea inferior a 0 (cero)
if (notaPendiente < 0) {
  var mensaje = `Para aprobar el ${nombreRamo} con nota 4, no necesitas más nota`;
} else {
  var mensaje = `Para aprobar el ramo ${nombreRamo} con nota 4, necesitas obtener un ${notaPendiente} en la nota 3.`;
}

// Pintamos en pantalla la 3ra nota pendiente para aprobar el tercer ramo
document.querySelector("#aprobacionCarrera").innerHTML = mensaje;
