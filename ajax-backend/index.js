const express = require("express");
const cors = require("cors");

const app = express();

const TAREAS = [
  {
    name: "Tarea 1",
    status: "P"
  }, {
    name: "Tarea 2",
    status: "W"
  }, {
    name: "Tarea 3",
    status: "T"
  }
];

app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req, res, next) => {
  res.status(200).send({ tareas: TAREAS });
});

app.post("/", (req, res) => {
  const tarea = req.body.tarea;
  const index = TAREAS.push(tarea);
  console.log({tareas: TAREAS});
  res.status(201).send(index);
});

// PUT http://localhost:3000/3
app.put("/:index", (req, res) => {
  const index = req.params.index;
  const tarea = req.body.tarea;
  TAREAS[index] = tarea;
  console.log({ tareas: TAREAS });
  res.status(204).send();
});

// DEL http://localhost:3000/3
app.delete("/:index", (req, res) => {
  const index = req.params.index;
  TAREAS.splice(index, 1);
  console.log({ tareas: TAREAS });
  res.send(`Hola desde ${req.method}`);
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("El servidor se está ejecutando en el puerto 3000");
});