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

  /**
  * Obtiene todos los equipos de la base de datos.
  *
  * @returns {Promise<Array|Object>} Un array de objetos de equipo si la operación es exitosa, o un objeto de error si falla.
  * @throws Lanza un error si hay un problema al conectarse a la base de datos o ejecutar la consulta.
  */
  async getAllTeams() {
    try {
      await this.conexion.connect();
      const data = await this.collection.find().toArray();
      return data;
    } catch (error) {
      return {
        success: false,
        error_type: error.name || 'Error',
        error_message: error.message || 'Ha ocurrido un error desconocido',
      }
    } finally {
      await this.conexion.close();
    }

  }

    /** 
    * Añade un nuevo equipo a la base de datos.
    *
    * @param {Object} params - Parámetros necesarios para añadir un nuevo equipo.
    * @param {string} params.nombre - Nombre del equipo.
    * @param {string} params.ciudad - Ciudad donde se encuentra el equipo.
    * @param {string} params.estadio_id - ID del estadio donde juega el equipo.
    * @param {string} params.entrenador_id - ID del entrenador del equipo.
    *
    * @returns {Promise<Object>} - Un objeto con información sobre la operación realizada.
    *  - success: Indica si la operación fue exitosa (true) o no (false).
    *  - message: Mensaje de confirmación o error.
    *  - data: Datos del equipo añadido (solo si success es true).
    *  - error_type: Tipo de error (solo si success es false).
    *  - error_message: Mensaje de error detallado (solo si success es false).
    *
    * @throws {Error} - Lanza un error si el estadio o entrenador especificados no existen.
  */
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

    /**
   * Actualiza un equipo en la base de datos por su ID.
   *
   * @param {Object} params - Parámetros necesarios para actualizar un equipo.
   * @param {string} params._id - ID del equipo a actualizar.
   * @param {Object} params.objUpdate - Objeto con los campos a actualizar.
   * @param {string} [params.objUpdate.nombre] - Nuevo nombre del equipo.
   * @param {string} [params.objUpdate.ciudad] - Nueva ciudad del equipo.
   * @param {string} [params.objUpdate.estadio_id] - Nuevo ID del estadio donde juega el equipo.
   * @param {string} [params.objUpdate.entrenador_id] - Nuevo ID del entrenador del equipo.
   *
   * @returns {Promise<Object>} - Un objeto con información sobre la operación realizada.
   *  - success: Indica si la operación fue exitosa (true) o no (false).
   *  - message: Mensaje de confirmación o error.
   *  - data: Datos del equipo actualizados (solo si success es true).
   *  - error_type: Tipo de error (solo si success es false).
   *  - error_message: Mensaje de error detallado (solo si success es false).
   *
   * @throws {Error} - Lanza un error si el estadio o entrenador especificados no existen.
   */
  async updateTeamById({_id, objUpdate}) {
    try {
      await this.conexion.connect();

      const atributosPermitidos = ["nombre", "ciudad", "estado_id", "entrenador_id"]

      for (let key of Object.keys(objUpdate)) {
        if (!atributosPermitidos.includes(key)) {
          throw new Error("Atributo no permitido: " + key)
        }
      }

      const newObjUpdate = {};
      for(let [key, value] of Object.entries(objUpdate)) {
          if (key.slice(-3) === "_id") {
            newObjUpdate[key] = new ObjectId(value);
          } else {
              newObjUpdate[key] = value;
          } 
      }

      if (newObjUpdate.estadio_id) {
        const estadioExiste = await this.db.collection('estadio').findOne({_id: newObjUpdate.estadio_id});
        if (!estadioExiste) {
          throw new Error("El estadio especificado no existe: " + objUpdate.estadio_id);
        }
      }

      if (newObjUpdate.entrenador_id) {
        const entrenadorExiste = await this.db.collection('entrenador').findOne({_id: newObjUpdate.entrenador_id});
        if (!entrenadorExiste) {
          throw new Error("El entrenador especificado no existe: " + objUpdate.entrenador_id);
        }
      }

      const updateTeam = await this.collection.updateOne({_id: new ObjectId(_id)}, { $set: newObjUpdate });

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

  /**
   * Elimina un equipo de la base de datos por su ID.
   *
   * @param {Object} params - Parámetros necesarios para eliminar un equipo.
   * @param {string} params._id - ID del equipo a eliminar.
   *
   * @returns {Promise<Object>} - Un objeto con información sobre la operación realizada.
   *  - success: Indica si la operación fue exitosa (true) o no (false).
   *  - message: Mensaje de confirmación o error.
   *  - error_type: Tipo de error (solo si success es false).
   *  - error_message: Mensaje de error detallado (solo si success es false).
   *
   * @throws {Error} - Lanza un error si el equipo especificado no existe.
   */
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