const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("./public"));

app.get("/", (req, res, next) => {
  res.status(201).send("Hola mundo!");
});

app.post("/", (req, res) => {
  res.send("Hola desde POST");
});

app.put("/", (req, res) => {
  res.send("Hola desde PUT");
});

app.delete("/", (req, res) => {
  res.send(`Hola desde ${req.method}`);
});

const sayHello = (req, res, next) => {
  console.log("sayHello");
  next();
};

const decirHola = (req, res, next) => {
  console.log("decirHola");
  next();
}

app.get("/hola", decirHola, sayHello, (req, res) => {
  console.log("good bye");
  res.send("Done");
});

app.get("/hola/:nombre", (req, res, next) => {
  const nombre = req.params.nombre;
  res.send(`Hola ${nombre}`);
});

app.post("/alumno", (req, res, next) => {
  console.log(req.body);
  console.log(req.query);
  // Almacenar DB
  const data = req.body;
  data.id = Math.random() * 10;
  res.json(data);
});

app.get("/ejemplo", (req, res, next) => {
  res.redirect("/hola");
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("El servidor se está ejecutando en el puerto 3000");
});
