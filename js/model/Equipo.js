import { ObjectId } from "mongodb";
import { Connect } from "../../helpers/db/Connect.js";

export class Equipo extends Connect {
  static instanceEquipo;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('equipo');
    if (Equipo.instanceEquipo) {
      return Equipo.instanceEquipo;
    }
    Equipo.instanceEquipo = this;
    return this;
  }

  async getAllTeams() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

  // TODO: CRUD for teams
  // addTeam(), updateTeam(), deleteTeam()

  async addTeam({nombre, ciudad, estadio_id, entrenador_id}) {
    try {
      await this.conexion.connect();

      const estadioExiste = await this.db.collection('estadio').findOne({_id: new ObjectId(estadio_id)});
      if (!estadioExiste) {
        throw new Error("El estadio especificado no existe: " + estadio_id);
      }

      const entrenadorExiste = await this.db.collection('entrenador').findOne({_id: new ObjectId(entrenador_id)});
      if (!entrenadorExiste) {
        throw new Error("El entrenador especificado no existe: " + entrenador_id);
      }

      let nuevoEquipo = {
        nombre: nombre,
        ciudad: ciudad,
        estadio_id: new ObjectId(estadio_id),
        entrenador_id: new ObjectId(entrenador_id),
      }

      await this.collection.insertOne(nuevoEquipo);
      
      return {
        success: true,
        message: 'Equipo agregado correctamente',
        data: nuevoEquipo,
      };
    } catch (error) {
      return {
        success: false,
        error_type: error.name || 'Error',
        error_message: error.message || 'Ha ocurrido un error desconocido',
      };
    } finally {
      await this.conexion.close();
    }
  }

}