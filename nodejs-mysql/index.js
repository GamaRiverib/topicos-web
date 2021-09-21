const mysql = require("mysql");

const options = {
  database: "topicosweb",
  user: "root",
  password: "javascript",
  insecureAuth: true
};

function insertData() {
  const sql = "INSERT INTO alumno(nombres,apellidos,edad,carrera) \
                VALUES('Citlali', 'Orduño', 22, 'DG');";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(result);
    process.exit(0);
  });
}

const selectData = () => {
  const id = 2;
  const columns = ["nombres", "apellidos"];
  const table = "alumno"
  const sql = "SELECT ?? FROM ?? WHERE id = ?";
  const values = [columns, table, id];
  const queryOptions = { sql, values };

  connection.query(queryOptions, (err, result) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(result);
    process.exit(0);
  });
}

const connection = mysql.createConnection(options);

connection.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  // insertData();
  selectData();
});