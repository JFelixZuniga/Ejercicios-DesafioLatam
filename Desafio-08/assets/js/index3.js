/*
Ejercicios 3.- 
Crear un programa que pida al usuario ingresar la temperatura en grados Celsius y que la transforme a grados Kelvin y Fahrenheit.
 */

// Solicitamos y capturamos el dato ingresado por el usuario
var grados = +prompt("Ingrese la temperatura en grados celsius");

// Creamos una función para convertir los grados a Kelvin
function celsiusAKelvin(data) {
  // Realizamos la operación
  let grados = data + 273.15;
  return document.write(`<p>Temperatura en grados Kelvin: ${grados}</p>`);
}

// Creamos una función para convertir los grados a Fahrenheit
function celsiusAFahrenheit(data) {
  // Realizamos la operación
  let grados = data * (9 / 5) + 32;
  return document.write(`<p>Temperatura en grados Fahrenheit: ${grados}</p>`);
}

celsiusAKelvin(grados);
celsiusAFahrenheit(grados);
