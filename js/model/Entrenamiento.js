import { Connect } from "../../helpers/db/Connect.js";

export class Entrenamiento extends Connect {
  static instanceEntrenamiento;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('entrenamiento');
    if (Entrenamiento.instanceEntrenamiento) {
      return Entrenamiento.instanceEntrenamiento;
    }
    Entrenamiento.instanceEntrenamiento = this;
    return this;
  }

  async getAllTrainings() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}