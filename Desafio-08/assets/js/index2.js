/*
Ejercicio 2.-
  Realizar operaciones con dos números. Pedir al usuario que ingrese dos números diferentes y mayores a cero. Para ambos
números, calcular lo siguiente:
  - Suma
  - Resta
  - División
  - Multiplicación
  - Módulo
*/

// Inicializamos n en 0 (cero)
let n = 0;

// Con WHILE mientras sea TRUE se ejecuta su contenido
while (n == 0) {
  var numero1 = +prompt("ingrese un número mayor a 0");
  var numero2 = +prompt("ingrese un segundo número mayor a 0 ");

  // Validamos que los números ingresados sean mayores a 0 (cero) y diferentes entre ellos
  if (numero1 < 0 || numero2 < 0 || numero1 === numero2) {
    alert(
      "Números no válidos. Ingrese números mayores a 0 y diferente entre ellos"
    );
    n = 0;
  } else {
    n = 1;
  }
}

// Función que recibe como argumento 2 números y devuelve las operaciones entre ellos
function operacionesAritmeticas(n1, n2) {
  var suma = n1 + n2;
  var resta = n1 - n2;
  var division = (n1 / n2).toFixed(2);
  var multiplicacion = n1 * n2;
  var modulo = n1 % n2;

  return document.write(
    `<p>Los resultados de las operaciones son:</p><ul><li>La suma es: ${suma}</li><li>La resta es: ${resta}</li><li>La division es: ${division}</li><li>La multiplicacion es: ${multiplicacion}</li><li>El modulo es ${modulo}</li></ul>`
  );
}

operacionesAritmeticas(numero1, numero2);
