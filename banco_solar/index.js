const http = require("http");
const fs = require("fs");
const url = require("url");

const {
  nuevoUsuario,
  getUsuarios,
  editarUsuario,
  eliminarUsuario,
  registrarTransferencia,
  getTransferencias,
} = require("./consultas.js");

http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method == "GET") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
        } else {
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        }
      });
    }

    if (req.url == "/usuario" && req.method == "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const usuario = JSON.parse(body);
        try {
          const result = await nuevoUsuario(usuario);
          res.statusCode = 201;
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 500;
          res.end("Ocurrió un problema en el servidor: " + error);
        }
      });
    }

    if (req.url === "/usuarios" && req.method === "GET") {
      try {
        const usuarios = await getUsuarios();
        res.end(JSON.stringify(usuarios));
      } catch (error) {
        res.statusCode = 500;
        res.end("Ocurrió un problema en el servidor: " + error);
      }
    }

    if (req.url.startsWith("/usuario?") && req.method == "PUT") {
      let body = "";
      let { id } = url.parse(req.url, true).query;
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const usuario = JSON.parse(body);
        usuario.id = id;
        try {
          const result = await editarUsuario(usuario);
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 500;
          res.end("Ocurrió un problema en el servidor: " + error);
        }
      });
    }

    if (req.url.startsWith("/usuario?") && req.method === "DELETE") {
      try {
        let { id } = url.parse(req.url, true).query;
        await eliminarUsuario(id);
        res.end("Usuario eliminado.");
      } catch (error) {
        res.statusCode = 500;
        res.end("Ocurrió un problema en el servidor: " + error);
      }
    }

    if (req.url == "/transferencia" && req.method == "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      console.log(body);
      req.on("end", async () => {
        const transferencia = JSON.parse(body);
        try {
          const result = await registrarTransferencia(transferencia);
          res.statusCode = 201;
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 500;
          res.end("Ocurrió un problema en el servidor: " + error);
        }
      });
    }

    if (req.url === "/transferencias" && req.method === "GET") {
      try {
        const transferencias = await getTransferencias();
        res.end(JSON.stringify(transferencias));
      } catch (error) {
        res.statusCode = 500;
        res.end("Ocurrió un problema en el servidor: " + error);
      }
    }
  })
  .listen(3000, () => console.log("Server ON"));
