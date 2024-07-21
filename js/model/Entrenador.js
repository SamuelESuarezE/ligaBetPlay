import { ObjectId } from "mongodb";
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

    /**
   * Obtiene todos los entrenadores de la base de datos.
   *
   * @returns {Promise<Array|Object>} Un array de objetos de entrenadores si la operación es exitosa, o un objeto de error si falla.
   */
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
  
  /**
 * Añade un nuevo entrenador a la base de datos.
 *
 * @param {Object} obj - Objeto con los detalles del entrenador.
 * @param {string} obj.nombre - Nombre del entrenador.
 * @param {string} obj.email - Email del entrenador.
 * @param {string} obj.telefono - Teléfono del entrenador.
 * @param {number} obj.experiencia - Experiencia del entrenador en años.
 *
 * @returns {Promise<Object>} - Un objeto con la información de éxito o error.
 * - Si la operación es exitosa, el objeto contendrá:
 *   - success: true
 *   - data: Objeto del entrenador recién creado.
 * - Si la operación falla, el objeto contendrá:
 *   - success: false
 *   - error_type: El tipo de error.
 *   - error_message: El mensaje de error.
 */
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

  /**
   * Actualiza un entrenador en la base de datos por su ID.
   *
   * @param {Object} params - Parámetros de la función.
   * @param {string} params._id - ID del entrenador a actualizar.
   * @param {Object} params.objUpdate - Objeto con los nuevos valores a actualizar.
   *
   * @returns {Promise<Object>} - Un objeto con la información de éxito o error.
   * - Si la operación es exitosa, el objeto contendrá:
   *   - success: true
   *   - message: Mensaje de éxito.
   *   - data: Objeto con los valores actualizados.
   * - Si la operación falla, el objeto contendrá:
   *   - success: false
   *   - error_type: El tipo de error.
   *   - error_message: El mensaje de error.
   */
  async updateTrainerById({_id, objUpdate}) {
    try {
      await this.conexion.connect();

      const atributosPermtidos = ["nombre", "email", "telefono", "experiencia" ]
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const telefonoRegex = /^\+\S+$/

      for (let [key, value] of Object.entries(objUpdate)) {
        if (!atributosPermtidos.includes(key)) {
          throw new Error(`Atributo no permitido: ${key}`);
        }

        switch (key) {
          case 'email':
            if (!emailRegex.test(value)) {
              throw new Error('El email especificado no es valido: '+ value);
            }
            break;
          case 'telefono':
            if (!telefonoRegex.test(value)) {
              throw new Error('El telefono especificado no es valido: '+ value);
            }
            break;
          default:
            break;
        }
      }

      const trainerExiste = await this.collection.findOne({_id: new ObjectId(_id)})
      if (!trainerExiste) {
        throw new Error('El entrenador especificado no existe: '+ _id);
      }

      await this.collection.updateOne({_id: new ObjectId(_id)},{$set: objUpdate})

      return {
        success: true,
        message: 'Entrenador actualizado correctamente',
        data: objUpdate,
      }
    } catch (error) {
      return {
        success: false,
        error_type: error.name || "Error",
        error_message: error.message || "Ha ocurrido un error desconocido",
      }
    } finally {
      await this.conexion.close()
    }
  }

  /**
   * Elimina un entrenador de la base de datos por su ID.
   *
   * @param {Object} params - Parámetros de la función.
   * @param {string} params._id - ID del entrenador a eliminar.
   *
   * @returns {Promise<Object>} - Un objeto con la información de éxito o error.
   * - Si la operación es exitosa, el objeto contendrá:
   *   - success: true
   *   - message: Mensaje de éxito.
   *   - data: Objeto con la información del entrenador eliminado.
   * - Si la operación falla, el objeto contendrá:
   *   - success: false
   *   - error_type: El tipo de error.
   *   - error_message: El mensaje de error.
   */
  async deleteTrainerById({_id}) {
    try {
      await this.conexion.connect();

      const trainerExiste = await this.collection.findOne({_id: new ObjectId(_id)})
      if (!trainerExiste) {
        throw new Error('El entrenador especificado no existe: '+ _id);
      }

      await this.collection.deleteOne({_id: new ObjectId(_id)})

      // ! Al eliminar un trainer tambien se elimina su ID del equipo que haya tenido asignado
      await this.db.collection("equipo").updateOne({entrenador_id: new ObjectId(_id)}, {$set: {entrenador_id: null}})
      
      return {
        success: true,
        message: 'Entrenador eliminado correctamente',
        data: trainerExiste
      }
    } catch (error) {
      return {
        success: false,
        error_type: error.name || "Error",
        error_message: error.message || "Ha ocurrido un error desconocido",
      }
    } finally {
      await this.conexion.close()
    }
  }
}
