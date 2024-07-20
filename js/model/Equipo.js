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

  async updateTeamById({_id, objUpdate}) {
    try {
      await this.conexion.connect();

      if (objUpdate.estadio_id) {
        const estadioExiste = await this.db.collection('estadio').findOne({_id: new ObjectId(objUpdate.estadio_id)});
        if (!estadioExiste) {
          throw new Error("El estadio especificado no existe: " + objUpdate.estadio_id);
        }
      }

      if (objUpdate.entrenador_id) {
        const entrenadorExiste = await this.db.collection('entrenador').findOne({_id: new ObjectId(objUpdate.entrenador_id)});
        if (!entrenadorExiste) {
          throw new Error("El entrenador especificado no existe: " + objUpdate.entrenador_id);
        }
      }

      const updateTeam = await this.collection.updateOne({_id: new ObjectId(_id)}, { $set: objUpdate });

      if (updateTeam.matchedCount == 0) {
        throw new Error("El equipo especificado no existe: " + _id)
      } 

      return {
        success: true,
        message: 'Equipo actualizado correctamente',
        data: objUpdate,
      }
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

  async deleteTeamById({_id}) {
    try {
      await this.conexion.connect()

      const deleteTeam = await this.collection.deleteOne({_id: new ObjectId(_id)})

      if (deleteTeam.deletedCount == 0) {
        throw new Error('El equipo especificado no existe: '+_id)
      }

      return {
        success: true,
        message: 'Equipo eliminado correctamente',
      }
    } catch (error) {
      return {
        success: false,
        error_type: error.name || 'Error',
        error_message: error.message || 'Ha ocurrido un error desconocido',
      }
    } finally {
      await this.conexion.close()
    }
  }
}