import { ObjectId } from "mongodb";
import { Connect } from "../../helpers/db/Connect.js";

export class Estadio extends Connect {
    static instanceEstadio;
    db;
    collection;

    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("estadio");
        if (Estadio.instanceEstadio) {
            return Estadio.instanceEstadio;
        }
        Estadio.instanceEstadio = this;
        return this;
    }

    /**
     * Obtiene todos los estadios de la base de datos.
     *
     * @returns {Promise<Array|Object>} Un array de objetos de estadios o un objeto de error.
     * @throws Lanza un error si hay un problema al conectarse a la base de datos o recuperar datos.
     */
    async getAllStadiums() {
        try {
            await this.conexion.connect();
            const data = await this.collection.find().toArray();
            return data
        } catch (error) {
            return {
                success: false,
                error_type: error.name || "Error",
                error_message: error.message || "Ha ocurrido un error desconocido",
            };
        } finally {
            await this.conexion.close();
        }
    }

    /**
     * Añade un nuevo estadio a la base de datos.
     *
     * @param {Object} params - Parámetros necesarios para añadir un estadio.
     * @param {string} params.nombre - Nombre del estadio.
     * @param {string} params.ubicacion - Ubicación del estadio.
     * @param {number} params.capacidad_maxima - Capacidad máxima del estadio.
     *
     * @returns {Promise<Object>} - Un objeto con información sobre el resultado de la operación.
     *  - success: Indica si la operación fue exitosa (true) o no (false).
     *  - message: Mensaje de éxito o error.
     *  - data: Datos del estadio registrado (solo si success es true).
     *  - error_type: Tipo de error (solo si success es false).
     *  - error_message: Mensaje de error detallado (solo si success es false).
     *
     * @throws {Error} - Lanza un error si hay un problema al conectarse a la base de datos o registrar datos.
     */
    async addStadium({nombre, ubicacion, capacidad_maxima}) {
        try {
            await this.conexion.connect()

            const newStadium = { nombre, ubicacion, capacidad_maxima }
            await this.collection.insertOne(newStadium)
            return {
                success: true,
                message: 'Estadio registrado correctamente',
                data: newStadium,
            }
        } catch (error) {
            return {
                success: false,
                error_type: error.name || "Error",
                error_message: error.message || "Ha ocurrido un error desconocido",
            };
        } finally {
            await this.conexion.close();
        }

    }

    /**
     * Actualiza un estadio en la base de datos por su ID.
     *
     * @param {Object} params - Parámetros necesarios para actualizar un estadio.
     * @param {string} params._id - ID del estadio a actualizar.
     * @param {Object} params.objUpdate - Objeto con los nuevos valores para actualizar.
     *
     * @returns {Promise<Object>} - Un objeto con información sobre el resultado de la operación.
     *  - success: Indica si la operación fue exitosa (true) o no (false).
     *  - message: Mensaje de éxito o error.
     *  - data: Datos del estadio actualizado (solo si success es true).
     *  - error_type: Tipo de error (solo si success es false).
     *  - error_message: Mensaje de error detallado (solo si success es false).
     *
     * @throws {Error} - Lanza un error si hay un problema al conectarse a la base de datos o actualizar datos.
     */
    async updateStadiumById({_id, objUpdate}) {
        try {
            await this.conexion.connect()

            const atributosPermitidos = ["nombre", "ubicacion", "capacidad_maxima"]

            for (let [key, value] of Object.entries(objUpdate)) {
                if (!atributosPermitidos.includes(key)) {
                    throw new Error("Atributo no permitido: " + key)
                }

                if (key == "capacidad_maxima" && value < 0) {
                    throw new Error("La capacidad máxima no puede ser negativa: " + value)
                }
            }

            const res = await this.collection.updateOne({ _id: new ObjectId(_id) }, {$set: objUpdate})

            if (res.matchedCount === 0) {
                throw new Error("El estadio especificado no existe: " + _id)
            }

            return {
                success: true,
                message: 'Estadio actualizado correctamente',
                data: objUpdate,
            }
        } catch (error) {
            return {
                success: false,
                error_type: error.name || "Error",
                error_message: error.message || "Ha ocurrido un error desconocido",
            };
        } finally {
            await this.conexion.close();
        }
    }

    /**
     * Elimina un estadio de la base de datos por su ID.
     *
     * @param {Object} params - Parámetros necesarios para eliminar un estadio.
     * @param {string} params._id - ID del estadio a eliminar.
     *
     * @returns {Promise<Object>} - Un objeto con información sobre el resultado de la operación.
     *  - success: Indica si la operación fue exitosa (true) o no (false).
     *  - message: Mensaje de éxito o error.
     *
     * @throws {Error} - Lanza un error si hay un problema al conectarse a la base de datos o eliminar datos.
    */
    async deleteStadiumById({_id}) {
        try {
            await this.conexion.connect()
            const res = await this.collection.deleteOne({ _id: new ObjectId(_id) })
            if (res.deletedCount === 0) {
                throw new Error("El estadio especificado no existe: " + _id)
            }
            return {
                success: true,
                message: 'Estadio eliminado correctamente',
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
