import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb";


export class Partido extends Connect {
  static instancePartido;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('partido');
    if (Partido.instancePartido) {
      return Partido.instancePartido;
    }
    Partido.instancePartido = this;
    return this;
  }

  async getAllMatchs() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }
  // funcion para poder actualizar los resultados de un partido en tiempo real:
  async addMatchResult(matchId, result) {
    await this.conexion.connect();
    // realizamos la verificacion de que el id del partido exista, si no existe no permitira actualizar nada
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    // si existe el partido procedemos mediante updateone y $set a actualizar el resultado anterior por el reciente
    const resultUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $set: { resultado: result } }
    );
    await this.conexion.close();
    return resultUpdate;
  }
  // si el administrador o el arbitro deciden que es necesario eliminar los resultados de un partido creamos esta funcion
  async deleteMatchResult(matchId) {
    await this.conexion.connect();
    // verificamos que el id del partido exista
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    //si existe mediante updateone y $unset procedemos a eliminar los datos existentes. Esto es poco probable pero permite una mejor administracion de la base de datos 
    const resultUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $unset: { resultado: "" } } // dejamos en "" para dejar un dato vacio
    );
    await this.conexion.close();
    return resultUpdate;
  }
  // ahora creamos la funcion para poder agregar tarjetas por faltas o acontecimientos dados en el partido
  async addCard(matchId, card) {
    await this.conexion.connect();
    // verificamos que el partido exista
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    // si existe mediante la funcion updateone y $push estariamos creando un nuevo array de objetos que tendra los datos de esa tarjeta, esto puede hacerse cuantas veces sea necesario
    const cardUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $push: { tarjetas: card } }
    );
    await this.conexion.close();
    return cardUpdate;
  }
}