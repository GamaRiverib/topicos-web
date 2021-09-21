import { MongoClient, Db } from "mongodb";
import { Command } from "commander";

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

const program = new Command();
program
  .version("0.1.0")
  .command("find [name]")
  .description("Obtiene la lista de alumnos")
  .action(async (name: string): Promise<any> => {
    try {
      const db: Db = await getDatabase();
      const collection = db.collection("alumnos");
      const query: { name?: string } = {};
      if (name) {
        query.name = name;
      }
      const result = collection.find(query);
      const arr = await result.toArray();
      console.log(arr);
      process.exit(0);
    } catch (err: any) {
      console.log(err);
      process.exit(1);
    }
});

interface Alumno {
  name: string;
  career: string;
  age?: number;
}

program
  .command("add <name>")
  .option("-c, --career [career]", "Carrera del alumno", "IS")
  .option("-a, --age <age>", "Edad del alumno")
  .description("Permite agregar un alumno")
  .action(async (name: string, options: { career: string, age?: string }) => {
    try {
      console.debug(options);
      const alumno: Alumno = {
        name,
        career: options.career,
        age: options.age ? parseInt(options.age) : undefined
      };
      const db: Db = await getDatabase();
      const collection = db.collection("alumnos");
      const result = await collection.insertOne(alumno);
      console.log(result);
      process.exit(0);
    } catch (err: any) {
      console.log(err);
      process.exit(1);
    }
  });

program.parse(process.argv);