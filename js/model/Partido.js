import { Connect } from "../../helpers/db/Connect.js";


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

}