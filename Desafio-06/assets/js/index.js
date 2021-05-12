// Tooltip a los botones
$(document).ready(function () {
  $("button").tooltip();
});

// Evento Click sobre el botón de enviar recepta por correo
$("#correo").click(function () {
  alert("El correo fue enviado correctamente...");
});

// Cambiar de color los textos
$(document).ready(function () {
  $("h4").on("dblclick", function () {
    $(this).css("color", "red");
  });
});

$(".card-title").dblclick(function () {
  $(".card-text").toggle("slow");
});
