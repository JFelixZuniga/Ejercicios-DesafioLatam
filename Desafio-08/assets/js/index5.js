/*
Ejercicio 5.-
Crear un programa que solicite al usuario 5 números y realice los cálculos que se piden a continuación.
*/

// Iniciamos el contador en 0 (cero)
let contador = 0;

// Solicitamos el 1er número al usuario
let numero = +prompt("Ingrese un numero");

// Mientras el contador sea menor a 4 se solicitará al usuario ingresar por prompt datos (números)
while (contador < 4) {
  // Solicitamos el ingreso de un nuevo dato (número) y sumamos a la vez
  numero += +prompt("Ingrese");

  // Aumentamos el contador en 1
  contador++;
}
document.write(`La suma total es ${numero}, y el promedio es ${numero / 5}`);
