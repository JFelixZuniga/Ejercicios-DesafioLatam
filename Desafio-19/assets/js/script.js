class Propietario {
  constructor(nombrePropietario, direccion, telefono) {
    this.nombrePropietario = nombrePropietario;
    this.direccion = direccion;
    this.telefono = telefono;
  }
  get nombre() {
    return this.nombrePropietario;
  }
  datosPropietario() {
    return `El nombre del dueño es ${this.nombrePropietario}. El domicilio es ${this.direccion}, y el número telefónico de contacto es ${this.telefono}.`;
  }
}

class Animal extends Propietario {
  constructor(nombrePropietario, direccion, telefono, tipo) {
    super(nombrePropietario, direccion, telefono);
    this._tipo = tipo;
  }

  get tipo() {
    return `El tipo de animal es un ${this._tipo}`;
  }
}

class Mascota extends Animal {
  constructor(
    nombrePropietario,
    direccion,
    telefono,
    tipo,
    nombreMascota,
    enfermedad
  ) {
    super(nombrePropietario, direccion, telefono, tipo);
    this._nombreMascota = nombreMascota;
    this._enfermedad = enfermedad;
  }
  get nombre() {
    return this._nombreMascota;
  }
  set nombre(nuevoNombre) {
    this._nombreMascota = nuevoNombre;
  }
  get enfermedad() {
    return this._enfermedad;
  }
  set enfermedad(nuevaEnfermedad) {
    this._enfermedad = nuevaEnfermedad;
  }
}

const crearMensaje = (Mascota) => {
  let mensajeDatosPropietario = Mascota.datosPropietario();
  console.log(mensajeDatosPropietario);
  let mensajeDatosMascota = `${Mascota.tipo}, mientras que el nombre de la mascota es ${Mascota.nombre} y la enfermedad es ${Mascota.enfermedad}`;
  let mensajeHTML = `<li> ${mensajeDatosPropietario}</li>
    <li> ${Mascota.tipo}, mientras que el nombre de la mascota es ${Mascota.nombre} y la enfermedad es ${Mascota.enfermedad}</li>`;
  return mensajeHTML;
};

const form = document.getElementsByTagName("form")[0];
const ulresultado = document.getElementById("ulresultado");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let arregloInputs = Array.from(
    document.getElementsByClassName("form-control")
  );

  arregloInputs = arregloInputs.map((input) => input.value);

  let [
    nombrePropietario,
    telefono,
    direccion,
    nombreMascota,
    tipo,
    enfermedad,
  ] = arregloInputs;

  if (tipo == "perro") {
    const perro = new Mascota(
      nombrePropietario,
      direccion,
      telefono,
      tipo,
      nombreMascota,
      enfermedad
    );
    let mensajeHTML = crearMensaje(perro);
    console.log(mensajeHTML);
    ulresultado.innerHTML = mensajeHTML;
  } else if (tipo == "gato") {
    const gato = new Mascota(
      nombrePropietario,
      direccion,
      telefono,
      tipo,
      nombreMascota,
      enfermedad
    );
    let mensajeHTML = crearMensaje(gato);
    ulresultado.innerHTML = mensajeHTML;
  } else if (tipo == "conejo") {
    const conejo = new Mascota(
      nombrePropietario,
      direccion,
      telefono,
      tipo,
      nombreMascota,
      enfermedad
    );
    let mensajeHTML = crearMensaje(conejo);
    ulresultado.innerHTML = mensajeHTML;
  }
});
