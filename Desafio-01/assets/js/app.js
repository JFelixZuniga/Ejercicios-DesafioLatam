// Función constreuctora Consultorio
function Consultorio(nombre, pacientes) {
  this.nombre = nombre;
  this.pacientes = pacientes || [];
}

// Función constreuctora Paciente
function Paciente(nombre, rut, edad, diagnostico) {
  let _nombre = nombre;
  let _rut = rut;
  let _edad = edad;
  let _diagnostico = diagnostico;

  Object.defineProperty(this, "_nombre", {
    get: function () {
      return _nombre;
    },
    set: function (nombre) {
      _nombre = nombre;
    },
  });

  Object.defineProperty(this, "_edad", {
    get: function () {
      return _edad;
    },
    set: function (edad) {
      _edad = edad;
    },
  });

  Object.defineProperty(this, "_rut", {
    get: function () {
      return _rut;
    },
    set: function (rut) {
      _rut = rut;
    },
  });

  Object.defineProperty(this, "_diagnostico", {
    get: function () {
      return _diagnostico;
    },
    set: function (diagnostico) {
      _diagnostico = diagnostico;
    },
  });
}

Paciente.prototype.getName = function () {
  return this._nombre;
};
Paciente.prototype.setName = function (nombre) {
  this._nombre = nombre;
};
Paciente.prototype.getEdad = function () {
  return this._edad;
};
Paciente.prototype.setEdad = function (edad) {
  this._edad = edad;
};
Paciente.prototype.getRut = function () {
  return this._rut;
};
Paciente.prototype.setRut = function (rut) {
  this._rut = rut;
};
Paciente.prototype.getDiagnostico = function () {
  return this._diagnostico;
};
Paciente.prototype.setDiagnostico = function (diagnostico) {
  this._diagnostico = diagnostico;
};

const p1 = new Paciente("Brian", 123456789, 26, "Siempre tengo hambre");
const p2 = new Paciente("Vegeta", 2121213454, 32, "Ira infinita");
const p3 = new Paciente("cris", 555555555, 32, "Javascrisis");
const p4 = new Paciente("Goku", 1555555, 20, "duermo poco");
const p5 = new Paciente("Naruto", 250000, 16, "personalidades multiples");

// console.log(p1.setName("Milk"));

const pacientes = [p1, p2, p3, p4, p5];

// Agregar un método a Consultorio que permita devolver los datos de un paciente
// Basado en su nombre ( parámetro del método )
Consultorio.prototype.getPacienteByName = function (nombre) {
  return this.pacientes.find((p) => p.getName() == nombre);
};

// Agregar un método al Consultorio que permita imprimir los datos de todos sus pacientes
Consultorio.prototype.imprimirDatosPaciente = function () {
  this.pacientes.forEach((paciente) => {
    let properties = Object.keys(paciente.__proto__);
    properties = properties.filter((p) => p.startsWith("get"));
    console.log(properties.map((p) => paciente[p]()).join(" - "));
  });
};

const consultorio = new Consultorio("Consultorio Namek", pacientes);

// console.log(consultorio.getPacienteByName("Naruto").getDiagnostico());

consultorio.imprimirDatosPaciente();

/*
  PROTOTIPOS: mecanismo mediante el cual los objetos en JavaScript heredan características entre sí, es decir, un objeto puede tener diversas características pertenecientes a otro objeto, en otras palabras, los objetos en JavaScript se construyen en base a prototipos.
*/
