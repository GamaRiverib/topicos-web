const express = require("express");

const app = express();

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

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("El servidor se está ejecutando en el puerto 3000");
});
