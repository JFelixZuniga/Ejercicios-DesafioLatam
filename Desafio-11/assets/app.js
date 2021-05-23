const tablaUno = document.querySelector(".tablaUno");
const tablaDos = document.querySelector(".tablaDos");
const tablaTres = document.querySelector(".tablaTres");

const primeraAtencion = document.querySelector(".atencion1");
const segundaAtencion = document.querySelector(".atencion2");
const terceraAtencion = document.querySelector(".atencion3");
const cuartaAtencion = document.querySelector(".atencion4");
const quintaAtencion = document.querySelector(".atencion5");
const sextaAtencion = document.querySelector(".atencion6");

const radiologiaDatos = [
  {
    hora: "11:00",
    especialista: "IGNACIO SCHULZ",
    paciente: "FRANCISCA ROJAS",
    rut: "9878782-1",
    prevision: "FONASA",
  },
  {
    hora: "11:30",
    especialista: "FEDERICO SUBERCASEAUX",
    paciente: "PAMELA ESTRADA",
    rut: "15345241-3",
    prevision: "ISAPRE",
  },
  {
    hora: "15:00",
    especialista: "FERNANDO WURTHZ",
    paciente: "ARMANDO LUNA",
    rut: "16445345-9",
    prevision: "ISAPRE",
  },
  {
    hora: "15:30",
    especialista: "ANA MARIA GODOY",
    paciente: "MANUEL GODOY",
    rut: "17666419-0",
    prevision: "FONASA",
  },
  {
    hora: "16:00",
    especialista: "PATRICIA SUAZO",
    paciente: "RAMON ULLOA",
    rut: "14989389-K",
    prevision: "FONASA",
  },
];

const traumatologiaDatos = [
  {
    hora: "8:00",
    especialista: "MARIA PAZ ALTUZARRA",
    paciente: "PAULA SANCHEZ",
    rut: "15554774-5",
    prevision: "FONASA",
  },
  {
    hora: "10:00",
    especialista: "RAUL ARAYA",
    paciente: "ANGÉLICA NAVAS",
    rut: "15444147-9",
    prevision: "ISAPRE",
  },
  {
    hora: "10:30",
    especialista: "MARIA ARRIAGADA",
    paciente: "ANA KLAPP",
    rut: "17879423-9",
    prevision: "ISAPRE",
  },
  {
    hora: "11:00",
    especialista: "ALEJANDRO BADILLA",
    paciente: "FELIPE MARDONES",
    rut: "1547423-6",
    prevision: "ISAPRE",
  },
  {
    hora: "11:30",
    especialista: "CECILIA BUDNIK",
    paciente: "DIEGO MARRE",
    rut: "16554741-K",
    prevision: "FONASA",
  },
  {
    hora: "12:00",
    especialista: "ARTURO CAVAGNARO",
    paciente: "CECILIA MENDEZ",
    rut: "9747535-8",
    prevision: "ISAPRE",
  },
  {
    hora: "12:30",
    especialista: "ANDRES KANACRI",
    paciente: "MARCIAL SUAZO",
    rut: "11254785-5",
    prevision: "ISAPRE",
  },
];

const dentalDatos = [
  {
    hora: "8:30",
    especialista: "ANDREA ZUÑIGA",
    paciente: "MARCELA RETAMAL",
    rut: "11123425-6",
    prevision: "ISAPRE",
  },
  {
    hora: "11:00",
    especialista: "MARIA PIA ZAÑARTU",
    paciente: "ANGEL MUÑOZ",
    rut: "9878789-2",
    prevision: "ISAPRE",
  },
  {
    hora: "11:30",
    especialista: "SCARLETT WITTING",
    paciente: "MARIO KAST",
    rut: "7998789-5",
    prevision: "FONASA",
  },
  {
    hora: "13:00",
    especialista: "FRANCISCO VON TEUBER",
    paciente: "KARIN FERNANDEZ",
    rut: "18887662-K",
    prevision: "FONASA",
  },
  {
    hora: "13:30",
    especialista: "EDUARDO VIÑUELA",
    paciente: "HUGO SANCHEZ",
    rut: "17665461-4",
    prevision: "FONASA",
  },
  {
    hora: "14:00",
    especialista: "RAQUEL VILLASECA",
    paciente: "ANA SEPULVEDA",
    rut: "14441281-0",
    prevision: "ISAPRE",
  },
];

// Obtenemos los datos de la última 1ra en Radiología
const firstDato = [...radiologiaDatos].shift();
primeraAtencion.innerHTML = `${firstDato.paciente} - ${firstDato.prevision}`;
// Obtenemos los datos de la última atención en Radiología
const lastDato = [...radiologiaDatos].pop();
segundaAtencion.innerHTML = `${lastDato.paciente} - ${lastDato.prevision}`;

radiologiaDatos.forEach(({ hora, especialista, paciente, rut, prevision }) => {
  const row = document.createElement("tr");
  row.innerHTML += `
      <td class="font-weight-bold">${hora}</td>
      <td>${especialista}</td>
      <td>${paciente}</td>
      <td>${rut}</td>
      <td>${prevision}</td>
      `;
  // Insertamos dentro de la tabla la fila con información
  tablaUno.appendChild(row);
});

// Obtenemos los datos de la 1ra atención en Traumatología
const firstDato2 = [...traumatologiaDatos].shift();
terceraAtencion.innerHTML = `${firstDato2.paciente} - ${firstDato2.prevision}`;
// Obtenemos los datos de la última atención en Traumatología
const lastDato2 = [...traumatologiaDatos].pop();
cuartaAtencion.innerHTML = `${lastDato2.paciente} - ${lastDato2.prevision}`;

traumatologiaDatos.forEach(
  ({ hora, especialista, paciente, rut, prevision }) => {
    const row = document.createElement("tr");
    row.innerHTML += `
      <td class="font-weight-bold">${hora}</td>
      <td>${especialista}</td>
      <td>${paciente}</td>
      <td>${rut}</td>
      <td>${prevision}</td>
      `;
    tablaDos.appendChild(row);
  }
);

// Obtenemos los datos de la 1ra atención en Dental
const firstDato3 = [...dentalDatos].shift();
quintaAtencion.innerHTML = `${firstDato3.paciente} - ${firstDato3.prevision}`;
// Obtenemos los datos de la última atención en Dental
const lastDato3 = [...dentalDatos].pop();
sextaAtencion.innerHTML = `${lastDato3.paciente} - ${lastDato3.prevision}`;

dentalDatos.forEach(({ hora, especialista, paciente, rut, prevision }) => {
  const row = document.createElement("tr");
  row.innerHTML += `
    <td class="font-weight-bold">${hora}</td>
    <td>${especialista}</td>
    <td>${paciente}</td>
    <td>${rut}</td>
    <td>${prevision}</td>
    `;
  tablaTres.appendChild(row);
});
