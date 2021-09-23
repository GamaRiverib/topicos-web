import { MongoClient, Db, ObjectId } from "mongodb";
import { Command } from "commander";
import { cyan, green, red, yellow } from "colors";
import CliTable3, { TableConstructorOptions } from "cli-table3";


interface Alumno {
  name: string;
  career: string;
  age?: number;
}

async function getDatabase(): Promise<Db> {
  // Connection url
  const url = "mongodb://localhost:27017";
  // Database Name
  const dbName = "topicosweb";
  // Connect using MongoClient
  const mongoClient = new MongoClient(url);
  try {
    const client = await mongoClient.connect();
    const db = client.db(dbName);
    return db;
    // mongoClient.close();
  } catch (err: any) {
    console.log(err);
    process.exit(1);
  }
}

function getDatabase2(): Promise<Db> {
  return new Promise((resolve, reject) => {
    // Connection url
    const url = "mongodb://localhost:27017";
    // Database Name
    const dbName = "topicosweb";
    // Connect using MongoClient
    const mongoClient = new MongoClient(url);
    mongoClient.connect()
      .then((client: MongoClient) => {
        const db = client.db(dbName);
        resolve(db);
      })
      .catch(reject);
  });
}

const program = new Command();
program
  .version("0.1.0")
  .command("find [name]")
  .description("Obtiene la lista de alumnos")
  .action(async (name: string): Promise<any> => {
    try {
      const db: Db = await getDatabase();
      const collection = db.collection("alumnos");
      let query: any = {};
      if (name) {
        query = { name: { '$regex': name, '$options': "ig" } };
      }
      const result = collection.find(query);
      const arr = await result.toArray();
      console.log(arr);
      const head: string[] = ["id", "name", "career", "age"];
      const colWidths: number[] = [30, 30, 10, 10];
      const options: TableConstructorOptions = { head, colWidths };
      const table = new CliTable3(options);
      arr.forEach(a => {
        const row = [];
        row.push({ content: a._id.toString() });
        row.push({ content: a.name });
        row.push({ content: a.career || "-" });
        row.push({ content: a.age || "X" });
        table.push(row);
      });
      console.log(table.toString());
      process.exit(0);
    } catch (err: any) {
      console.log(`${red('Error')}: ${yellow(err.toString())}`);
      process.exit(1);
    }
});

program
  .command("add <name>")
  .option("-c, --career [career]", "Carrera del alumno", "IS")
  .option("-a, --age <age>", "Edad del alumno")
  .description("Permite agregar un alumno")
  .action(async (name: string, options: { career: string, age?: string }) => {
    try {
      const alumno: Alumno = {
        name,
        career: options.career,
        age: options.age ? parseInt(options.age) : undefined
      };
      const db: Db = await getDatabase();
      const collection = db.collection("alumnos");
      const result = await collection.insertOne(alumno);
      console.log(green('Registro exitoso'));
      console.log({ alumno: result });
      process.exit(0);
    } catch (err: any) {
      console.log(`${red('Error')}: ${yellow(err.toString())}`);
      process.exit(1);
    }
  });

program
  .command("update <id>")
  .option("-n, --name <name>", "El nombre del alumno")
  .option("-c, --career <career>", "La carrera que estudia el alumno")
  .option("-a, --age <age>", "La edad actual del alumno")
  .description("Actualiza la información de una alumno mediante su Id")
  .action(async (id: string, alumno: { name: string, career: string, age: string }) => {
    try {
      const query = { _id: new ObjectId(id) };
      const db: Db = await getDatabase();
      const collection = db.collection("alumnos");
      const result = await collection.updateOne(query, { $set: alumno });
      if (result.modifiedCount == 0) {
        console.log(`${yellow('Alerta:')} algo salió mal`);
      } else {
        console.log(`${green('Se actualizó exitosamente')}`);
      }
      process.exit(0);
    } catch (err: any) {
      console.log(`${red('Error')}: ${yellow(err.toString())}`);
      process.exit(1);
    }
  });

program
  .command("delete <id>")
  .description("Elimina la información de un alumno mediante su Id")
  .action(async (id: string) => {
    try {
      const query = { _id: new ObjectId(id) };
      const db = await getDatabase();
      const collection = db.collection("alumnos");
      const result = await collection.deleteOne(query);
      if (result.deletedCount == 0) {
        console.log(`${yellow('Alerta:')} algo salió mal`);
      } else {
        console.log(`${cyan('Se eliminó exitosamente')}`);
      }
      process.exit(0);
    } catch (err: any) {
      console.log(`${red('Error')}: ${yellow(err.toString())}`);
      process.exit(1);
    }
  })

program.parse(process.argv);