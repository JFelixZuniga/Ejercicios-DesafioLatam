const express = require("express");
const { postCurso, getCursos, deleteCurso, putCurso } = require("./consultas");

const app = express();

app.listen(3000, () => console.log("Server on"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cursos", async (req, res) => {
  const respuesta = await getCursos();
  res.json(respuesta);
});

app.post("/curso", async (req, res) => {
  const data = req.body;
  const respuesta = await postCurso(data);
  res.json(respuesta);
});

app.put("/curso/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const respuesta = await putCurso(id, data);
  res.json(respuesta);
});

app.delete("/curso/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await deleteCurso(id);
  respuesta > 0
    ? res.send(`El curso de id ${id} fue eliminado con éxito`)
    : res.send("No existe un curso registrado con ese id");
});
