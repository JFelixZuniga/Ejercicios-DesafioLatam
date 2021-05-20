const inputNumero = document.querySelector("input");
const btnStart = document.querySelector("button");

btnStart.addEventListener("click", () => {
  const { value: numero } = inputNumero;
  console.clear();

  if (numero < 1 || numero > 20) {
    return alert("Favor ingrese un número desde el 1 al 20");
  } else {
    for (let i = 1; i <= numero; i++) {
      console.log(`${i} X ${numero} = ${numero * i}`);
    }

    for (let i = 1; i <= numero; i++) {
      factorial = 1;
      for (let j = 1; j <= i; j++) {
        factorial *= j;
      }
      console.log(`El factorial de ${i} es ${factorial}`);
    }
  }
});
