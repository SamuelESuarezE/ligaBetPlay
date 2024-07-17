import { Connect } from "../../helpers/db/Connect.js";


export class Medio extends Connect {
  static instanceMedio;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('medio');
    if (Medio.instanceMedio) {
      return Medio.instanceMedio;
    }
    Medio.instanceMedio = this;
    return this;
  }

  async getAllMedias() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}