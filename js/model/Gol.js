import { Connect } from "../../helpers/db/Connect.js";


export class Gol extends Connect {
  static instanceGol;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('gol');
    if (Gol.instanceGol) {
      return Gol.instanceGol;
    }
    Gol.instanceGol = this;
    return this;
  }

  async getAllGoals() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}