import { Connect } from "../../helpers/db/Connect.js";


export class Tarjeta extends Connect {
  static instanceTarjeta;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('tarjeta');
    if (Tarjeta.instanceTarjeta) {
      return Tarjeta.instanceTarjeta;
    }
    Tarjeta.instanceTarjeta = this;
    return this;
  }

  async getAllCards() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}