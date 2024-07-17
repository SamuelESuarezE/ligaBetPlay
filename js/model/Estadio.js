import { Connect } from "../../helpers/db/Connect.js";


export class Estadio extends Connect {
  static instanceEstadio;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('estadio');
    if (Estadio.instanceEstadio) {
      return Estadio.instanceEstadio;
    }
    Estadio.instanceEstadio = this;
    return this;
  }

  async getAllStadiums() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}