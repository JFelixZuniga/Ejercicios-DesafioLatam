$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    let valueInput = $("#pokemonInput").val();

    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,
      success: function (data) {
        let nombre = data.name;
        let imagen = data.sprites.other;
        let { "official-artwork": foto } = imagen;
        console.log(foto.front_default);
        let peso = data.weight;

        $("#pokeInfo").html(
          `
          <div class="text-center">
            <h3 class="text-uppercase pb-3">${nombre}</h3>
            <img src="${foto.front_default}" alt="${nombre}" height="150">
            <h6 class="pt-3">Peso: ${peso}</h6>
          </div>
          `
        );

        let estadisticas = [];

        data.stats.forEach((stat) => {
          estadisticas.push({
            label: stat.stat.name,
            y: stat.base_stat,
          });
        });

        let config = {
          animationEnabled: true,
          title: {
            text: "Estadísticas",
          },
          axisY: {
            title: "Valor",
          },
          axisX: {
            title: "Estadística",
          },
          data: [
            {
              type: "column",
              dataPoints: estadisticas,
            },
          ],
        };

        let chart = new CanvasJS.Chart("pokeStats", config);

        chart.render();
      },
    });
  });
});
