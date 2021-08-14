/*
  CREATE​ ​TABLE​ cursos (​id​ ​SERIAL​ PRIMARY ​KEY​, nombre ​VARCHAR​(​50​) nivel INT​, fecha ​DATE​, duracion ​INT​);
*/

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgresql",
  database: "cursos",
  port: 5432,
});

const getCursos = async () => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, nivel, TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, duracion FROM cursos"
    );
    return result.rows;
  } catch (e) {
    return e;
  }
};

const postCurso = async (data) => {
  try {
    const values = Object.values(data);
    const consulta = {
      text: "INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *",
      values,
    };

    const result = await pool.query(consulta);
    return result.rows[0];
  } catch (e) {
    return e;
  }
};

const putCurso = async (id, data) => {
  try {
    const result = await pool.query(
      `UPDATE cursos SET nombre='${data.nombre}', nivel='${data.nivelTecnico}', fecha='${data.fechaInicio}', duracion=${data.duracion} WHERE id = ${id} RETURNING *`
    );
    return result.rows[0];
  } catch (e) {
    return e;
  }
};

const deleteCurso = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM cursos WHERE id = ${id}`);
    return result.rowCount;
  } catch (e) {
    return e;
  }
};

module.exports = {
  postCurso,
  getCursos,
  putCurso,
  deleteCurso,
};
