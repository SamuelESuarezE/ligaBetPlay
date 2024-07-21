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
}