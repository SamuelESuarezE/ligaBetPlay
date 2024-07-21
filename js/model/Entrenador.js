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

  // TODO: addTrainer, updateTrainerById, deleteTrainerById

  async addTrainer({nombre, email, telefono, experiencia}) {
    try {
      await this.conexion.connect();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const telefonoRegex = /^\+\S+$/
      
      if (!emailRegex.test(email)) {
        throw new Error('El email especificado no es valido ' + email);
      }

      if (!telefonoRegex.test(telefono)) {
        throw new Error('El telefono especificado no es valido ' + telefono);
      }

      const newTrainer = {nombre, email, telefono, experiencia}
      const result = await this.collection.insertOne(newTrainer);
      return {
        success: true,
        data: newTrainer,
      };
      
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
