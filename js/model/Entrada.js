import { Connect } from "../../helpers/db/Connect.js";


export class Entrada extends Connect {
  static instanceEntrada;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('entrada');
    if (Entrada.instanceEntrada) {
      return Entrada.instanceEntrada;
    }
    Entrada.instanceEntrada = this;
    return this;
  }

  async getAllTickets() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}