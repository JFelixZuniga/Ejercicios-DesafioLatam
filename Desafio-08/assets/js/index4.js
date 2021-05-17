/*
Ejercicios 4.-
Crear un programa que pida al usuario una cantidad de días y que muestre su equivalente en Años, Semanas y Días. Por ejemplo, si el usuario ingresa 373, el resultado debe ser 1 año, 1 semana y 1 día.
*/

// Solicitamos ingresar el número de días
var diasIngresados = +prompt("Favor ingrese un número de días");

// Función que recibe por argumento el número de días
function calcularDias(data) {
  // Obtenemos los años, y con Math.floor redondeamos el número entero hacia abajo
  var anios = Math.floor(data / 365);

  // Obtenemos el número de semanas
  var semana = Math.floor((data % 365) / 7);

  // Obtenemos el número de días
  var dias = Math.floor(((data % 365) / 7 - semana) * 7);

  // Pintamos en pantalla el resultado. Utilizamos el operador condicional ternario en el caso que al obtener los años, semanas o días nos de 0 (cero)
  return document.write(
    `<p>${anios == 0 ? "cero" : anios} año(s), 
    ${semana == 0 ? "cero" : semana} semana(s), y 
    ${dias == 0 ? "cero" : dias} día(s)</p>`
  );
}

calcularDias(diasIngresados);
