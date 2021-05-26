const btnData = document.querySelector("button");
const tabla = document.querySelector("#lista-feriados tbody");

btnData.addEventListener("click", async () => {
  const response = await fetch("https://www.feriadosapp.com/api/holidays.json");
  const feriados = await response.json();
  // console.log(feriados);
  const { data } = feriados;
  // console.log(data);

  data.forEach(({ date, title, extra }) => {
    const row = document.createElement("tr");
    row.innerHTML += `
      <td>${title}</td>
      <td>${date}</td>
      <td>${extra}</td>
    `;
    tabla.appendChild(row);
  });
});
