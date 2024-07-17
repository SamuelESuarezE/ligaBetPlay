import { Connect } from "../../helpers/db/Connect.js";


export class Resultado extends Connect {
  static instanceResultado;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('resultado');
    if (Resultado.instanceResultado) {
      return Resultado.instanceResultado;
    }
    Resultado.instanceResultado = this;
    return this;
  }

  async getAllResults() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}