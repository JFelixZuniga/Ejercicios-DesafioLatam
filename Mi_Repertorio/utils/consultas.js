/*
  CREATE DATABASE repertorio;
  \c repertorio
  CREATE TABLE repertorio (id SERIAL, cancion VARCHAR(50), artista VARCHAR(50), tono VARCHAR(10));
*/

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "repertorio",
  password: "postgresql",
  port: 5432,
});

const insertar = async (datos) => {
  const consulta = {
    text: "INSERT INTO repertorio(cancion, artista, tono) VALUES($1, $2, $3) RETURNING *;",
    values: datos,
  };
  try {
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.log(error.code);
  }
};

const consultar = async () => {
  try {
    const result = await pool.query("SELECT * FROM repertorio");
    return result;
  } catch (error) {
    console.log(error.code);
    return error;
  }
};

const editar = async (datos) => {
  const consulta = {
    text: `UPDATE repertorio SET
      cancion = $2,
      artista = $3,
      tono = $4
      WHERE id = $1  RETURNING *`,
    values: datos,
  };

  try {
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const eliminar = async (id) => {
  try {
    const result = await pool.query(
      `DELETE FROM repertorio WHERE id = '${id}'`
    );
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { insertar, consultar, editar, eliminar };
