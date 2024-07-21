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
    try {
      await this.conexion.connect();
      const data = await this.collection.find().toArray();
      return data;
    } catch (error) {
      return {
        success: false,
        error_type: error.name || "Error",
        error_message: error.message || "Ha ocurrido un error desconocido",
      }
    } finally {
      await this.conexion.close();
    }
  }
}
