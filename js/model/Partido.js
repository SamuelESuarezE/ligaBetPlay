import { ObjectId } from "mongodb";
import { Connect } from "../../helpers/db/Connect.js";

export class Partido extends Connect {
    static instancePartido;
    db;
    collection;

    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("partido");
        if (Partido.instancePartido) {
            return Partido.instancePartido;
        }
        Partido.instancePartido = this;
        return this;
    }

    /**
     * Obtiene todos los registros de partidos de la base de datos.
     *
     * @returns {Promise<Array>} Una promesa que se resuelve a un array de registros de partidos.
     * Si se produce un error durante la operación de base de datos, la promesa se resolverá a un objeto con
     * una propiedad 'success' establecida en false y propiedades 'error_type' y 'error_message' que proporcionan detalles sobre el error.
     */
    async getAllMatchs() {
        try {
            await this.conexion.connect();
            const data = await this.collection.find().toArray();
            return data;
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
     * Añade un nuevo partido a la base de datos.
     *
     * @param {Object} params - Parámetros necesarios para añadir un partido.
     * @param {string} params.equipo_local_id - ID del equipo local.
     * @param {string} params.equipo_visitante_id - ID del equipo visitante.
     * @param {string} params.fecha - Fecha del partido en formato ISO 8601 "YYYY-MM-DD".
     * @param {string} params.hora - Hora del partido en formato "HH:mm".
     * @param {string} params.estadio_id - ID del estadio donde se jugará el partido.
     * @param {string} params.arbitro_id - ID del árbitro que gestionará el partido.
     *
     * @returns {Promise<Object>} Una promesa que se resuelve a un objeto con propiedades 'success', 'message' y 'data'.
     * Si se produce un error durante la operación de base de datos, la promesa se resolverá a un objeto con
     * propiedades 'success' establecida en false y propiedades 'error_type' y 'error_message' que proporcionan detalles sobre el error.
     */
    async addMatch({equipo_local_id, equipo_visitante_id, fecha, hora, estadio_id, arbitro_id}) {
        try {
            await this.conexion.connect();

            // Validaciones
            const equipoLocalExiste = await this.db.collection("equipo").findOne({_id: new ObjectId(equipo_local_id)});
            if (!equipoLocalExiste) {
                throw new Error("El equipo local especificado no existe: " + equipo_local_id);
            }

            const equipoVisitanteExiste = await this.db.collection("equipo").findOne({_id: new ObjectId(equipo_visitante_id)});
            if (!equipoVisitanteExiste) {
                throw new Error("El equipo visitante especificado no existe: " + equipo_visitante_id);
            }

            if (equipo_local_id == equipo_visitante_id) {
                throw new Error("El equipo local y visitante especificados son el mismo: " + equipo_visitante_id);
            }

            const estadioExiste = await this.db.collection("estadio").findOne({_id: new ObjectId(estadio_id)});
            if (!estadioExiste) {
                throw new Error("El estadio especificado no existe: " + estadio_id);
            }

            const arbitroExiste = await this.db.collection("arbitro").findOne({_id: new ObjectId(arbitro_id)});
            if (!arbitroExiste) {
                throw new Error("El arbitro especificado no existe: " + arbitro_id);
            }

            const schedulingConflict = await this.collection.findOne({fecha: new Date(fecha), hora: hora, estadio_id: new ObjectId(estadio_id)});

            if (schedulingConflict) {
                throw new Error("Ya hay un partido programado en esa fecha y hora en el estadio especificado");
            }

            const newMatch = {
                equipo_local_id: new ObjectId(equipo_local_id),
                equipo_visitante_id: new ObjectId(equipo_visitante_id),
                fecha: new Date(fecha),
                hora,
                estadio_id: new ObjectId(estadio_id),
                arbitro_id: new ObjectId(arbitro_id),
                estado: "programado"
            }



            await this.collection.insertOne(newMatch);

            return {
                success: true,
                message: "Partido agregado correctamente",
                data: newMatch,
            };
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
     * Actualiza un partido existente en la base de datos.
     *
     * @param {Object} params - Parámetros necesarios para actualizar un partido.
     * @param {string} params._id - ID del partido que se va a actualizar.
     * @param {Object} params.objUpdate - Objeto con las propiedades que se van a actualizar.
     *
     * @returns {Promise<Object>} Una promesa que se resuelve a un objeto con propiedades 'success', 'message' y 'data'.
     * Si se produce un error durante la operación de base de datos, la promesa se resolverá a un objeto con
     * propiedades 'success' establecida en false y propiedades 'error_type' y 'error_message' que proporcionan detalles sobre el error.
     */
    async updateMatchById({_id, objUpdate}) {
        try {
            await this.conexion.connect();
            
            const partidoExiste = await this.collection.findOne({_id: new ObjectId(_id)});
            if (!partidoExiste) {
                throw new Error("El partido especificado no existe: " + _id);
            }

            const atributosPermitidos = ["equipo_local_id", "equipo_visitante_id", "fecha", "hora", "estadio_id", "arbitro_id", "estado"];

            for (let key of Object.keys(objUpdate)) {
                if (!atributosPermitidos.includes(key)) {
                    throw new Error("Atributo no permitido: " + key);
                }
            }
            
            const newObjUpdate = {};
            for(let [key, value] of Object.entries(objUpdate)) {
                if (key.slice(-3) === "_id") {
                  newObjUpdate[key] = new ObjectId(value);
                } else if (key == "fecha") {
                    newObjUpdate[key] = new Date(value);
                } else {
                    newObjUpdate[key] = value;
                } 
            }

            if (newObjUpdate.equipo_local_id) {
                const equipoLocalExiste = await this.db.collection("equipo").findOne({_id: newObjUpdate.equipo_local_id});
                if (!equipoLocalExiste) {
                    throw new Error("El equipo local especificado no existe: " + objUpdate.equipo_local_id);
                } else if (newObjUpdate.equipo_local_id == partidoExiste.equipo_visitante_id) {
                    throw new Error("El equipo local especificado es el mismo equipo visitante ya registrado en el partido: " + partidoExiste.equipo_visitante_id);
                }
            }

            if (newObjUpdate.equipo_visitante_id) {
                const equipoVisitanteExiste = await this.db.collection("equipo").findOne({_id: newObjUpdate.equipo_visitante_id});
                if (!equipoVisitanteExiste) {
                    throw new Error("El equipo visitante especificado no existe: " + objUpdate.equipo_visitante_id);
                } else if (newObjUpdate.equipo_visitante_id == partidoExiste.equipo_local_id) {
                    throw new Error("El equipo visitante especificado es el mismo equipo local ya registrado en el partido: " + partidoExiste.equipo_local_id);
                }
            }

            if (newObjUpdate.estadio_id) {
                const estadioExiste = await this.db.collection("estadio").findOne({_id: newObjUpdate.estadio_id});
                if (!estadioExiste) {
                    throw new Error("El estadio especificado no existe: " + objUpdate.estadio_id);
                }
            }

            if (newObjUpdate.arbitro_id) {
                const arbitroExiste = await this.db.collection("arbitro").findOne({_id: newObjUpdate.arbitro_id});
                if (!arbitroExiste) {
                    throw new Error("El arbitro especificado no existe: " + objUpdate.arbitro_id);
                }
            }

            if (newObjUpdate.fecha || newObjUpdate.hora){
                const schedulingConflict = await this.collection.findOne({fecha: new Date(newObjUpdate.fecha) || partidoExiste.fecha, hora: newObjUpdate.hora || partidoExiste.hora, estadio_id: newObjUpdate.estadio_id || partidoExiste.estadio_id});
                if (schedulingConflict) {
                    throw new Error("Ya hay un partido programado en esa fecha y hora en el estadio especificado");
                }
            }

            await this.collection.updateOne({_id: new ObjectId(_id)}, { $set: newObjUpdate });

            return {
                success: true,
                message: "Partido actualizado correctamente",
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
     * Elimina un partido existente de la base de datos por su ID.
     *
     * @param {Object} params - Parámetros necesarios para eliminar un partido.
     * @param {string} params._id - ID del partido que se va a eliminar.
     *
     * @returns {Promise<Object>} Una promesa que se resuelve a un objeto con propiedades 'success', 'message' y 'data'.
     * Si se produce un error durante la operación de base de datos, la promesa se resolverá a un objeto con
     * propiedades 'success' establecida en false y propiedades 'error_type' y 'error_message' que proporcionan detalles sobre el error.
     */
    async deleteMatchById({_id}) {
        try {
            await this.conexion.connect();

            const deleteMatch = await this.collection.deleteOne({_id: new ObjectId(_id)})

            if (deleteMatch.deletedCount == 0) {
              throw new Error('El partido especificado no existe: '+_id)
            }
      
            return {
              success: true,
              message: 'Partido eliminado correctamente',
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
}
