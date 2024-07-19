import { Connect } from "../../helpers/db/Connect.js";


export class Entrenador extends Connect {
  static instanceEntrenador;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('entrenador');
    if (Entrenador.instanceEntrenador) {
      return Entrenador.instanceEntrenador;
    }
    Entrenador.instanceEntrenador = this;
    return this;
  }

  async getAllTrainers() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}
