/*
  CREATE DATABASE bancosolar;

  \c bancosolar

  CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK (balance >= 0), activo BOOLEAN DEFAULT true);

  CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));
*/

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgresql",
  database: "bancosolar",
  port: 5432,
});

const nuevoUsuario = async (usuario) => {
  const values = Object.values(usuario);
  const consulta = {
    text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)",
    values,
  };

  const result = await pool.query(consulta);
  return result;
};

const getUsuarios = async () => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE activo = true;"
  );
  return result.rows;
};

const editarUsuario = async (usuario) => {
  const values = Object.values(usuario);
  const consulta = {
    text: `UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *`,
    values,
  };

  const result = await pool.query(consulta);
  return result;
};

const eliminarUsuario = async (id) => {
  const result = await pool.query(
    `UPDATE usuarios SET activo = false WHERE id = ${id} RETURNING *`
  );
  return result.rows;
};

const buscarId = async (data) => {
  const values = Object.values(data);

  const consultaIdEmisor = {
    text: "SELECT id FROM usuarios WHERE nombre =  $1 AND activo = true",
    values: [values[0]],
    rowMode: "array",
  };

  const consultaIdReceptor = {
    text: "SELECT id FROM usuarios WHERE nombre =  $1 AND activo = true",
    values: [values[1]],
    rowMode: "array",
  };

  const resultIdEmisor = await pool.query(consultaIdEmisor);
  const resultIdReceptor = await pool.query(consultaIdReceptor);

  const result = [values, resultIdEmisor.rows, resultIdReceptor.rows].flat(2);

  return result;
};

const registrarTransferencia = async (transferencia) => {
  const values = await buscarId(transferencia);

  const realizarTransferencia = {
    text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, current_timestamp) RETURNING *;",
    values: [values[3], values[4], Number(values[2])],
  };

  const descontarTransferencia = {
    text: "UPDATE usuarios SET balance = balance - $1 WHERE id = $2",
    values: [Number(values[2]), values[3]],
  };

  const sumarTransferencia = {
    text: "UPDATE usuarios SET balance = balance + $1 WHERE id = $2",
    values: [Number(values[2]), values[4]],
  };

  try {
    await pool.query("BEGIN");
    await pool.query(realizarTransferencia);
    await pool.query(descontarTransferencia);
    await pool.query(sumarTransferencia);
    await pool.query("COMMIT");
    return true;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

const getTransferencias = async () => {
  const consultaEmisor = {
    text: `SELECT t.id, u.nombre FROM transferencias t LEFT JOIN usuarios u ON t.emisor = u.id`,
    rowMode: "array",
  };

  const consultaReceptor = {
    text: `SELECT u.nombre, t.monto, t.fecha FROM transferencias t LEFT JOIN usuarios u ON t.receptor = u.id`,
    rowMode: "array",
  };
  const resultEmisor = await pool.query(consultaEmisor);
  const resultReceptor = await pool.query(consultaReceptor);

  let resultEmisorArreglo = resultEmisor.rows;
  let resultReceptorArreglo = resultReceptor.rows;

  const result = [];

  for (let i = 0; i < resultEmisorArreglo.length; i++) {
    result.push(resultEmisorArreglo[i].concat(resultReceptorArreglo[i]));
  }

  return result;
};

module.exports = {
  nuevoUsuario,
  getUsuarios,
  editarUsuario,
  eliminarUsuario,
  registrarTransferencia,
  getTransferencias,
};
