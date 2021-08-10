const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

app.set("view engine", ".hbs");

app.engine(
  ".hbs",
  exphbs({
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: __dirname + "/views/components",
    extname: ".hbs",
  })
);

app.use(express.static(__dirname + "/public"));

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));

app.use(
  "/BootstrapJs",
  express.static(__dirname + "/node_modules/bootstrap/dist/js/")
);

app.get("/", (req, res) => {
  res.render("Home", {
    productos: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
  });
});
