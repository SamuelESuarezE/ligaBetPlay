import { ObjectId } from "mongodb";
import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb";

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

            // * Validaciones de fecha y hora
            const fechaRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            if (fechaRegex.test(fecha)) {
              fecha = new Date(fecha)
            } else {
              throw new Error("La fecha especificada no es válida. Debe tener el formato YYYY-MM-DD: " + fecha);
            }

            const horaRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/

            if (!horaRegex.test(hora)) {
              throw new Error("La hora especificada no es válida. Debe tener el formato HH:mm: " + hora);
            }

            const schedulingConflict = await this.collection.findOne({fecha: fecha, hora: hora, estadio_id: new ObjectId(estadio_id)});

            if (schedulingConflict) {
                throw new Error("Ya hay un partido programado en esa fecha y hora en el estadio especificado");
            }

            // ! Se incluye un resultado por definir y goles, tarjetas e incidentes vacios para facilitar
            // ! su gestion en un futuro
            const newMatch = {
                equipo_local_id: new ObjectId(equipo_local_id),
                equipo_visitante_id: new ObjectId(equipo_visitante_id),
                fecha: new Date(fecha),
                hora,
                estadio_id: new ObjectId(estadio_id),
                arbitro_id: new ObjectId(arbitro_id),
                estado: "programado",
                resultado: {
                  goles_local: 0,
                  goles_visitante: 0,
                  resultado_final: "por definir"
                },
                goles: [],
                tarjetas: [],
                incidentes: [],
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

            // ! Nuevo error, no puede ser el mismo equipo como local y visitante
            if (objUpdate.equipo_local_id == objUpdate.equipo_visitante_id) {
              throw new Error("Los equipos locales y visitantes no pueden ser iguales: " + objUpdate.equipo_visitante_id);
            }

            // * Validaciones de fecha y hora
            const fechaRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            const horaRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/

            const newObjUpdate = {};
            
            for(let [key, value] of Object.entries(objUpdate)) {
                // Si es una ID, hace una instancia de ObjectId
                if (key.slice(-3) === "_id") {
                  newObjUpdate[key] = new ObjectId(value);
                // Si es una fecha, y pasa el regex hace una instancia de Date
                } else if (key == "fecha") {
                    if (fechaRegex.test(value)) {
                      newObjUpdate[key] = new Date(value)
                    } else {
                      throw new Error("La fecha especificada no es válida. Debe tener el formato YYYY-MM-DD: " + value);
                    }
                // Si es una hora y pasa el regex lo agrega al newObjUpdate
                } else if (key == "hora") {
                    if (horaRegex.test(value)) {
                      newObjUpdate[key] = value;
                    } else {
                      throw new Error("La hora especificada no es válida. Debe tener el formato HH:mm: " + value);
                    }
                // Si no es ni _id, ni fecha ni hora entonces lo agrega normal
                } else {
                  newObjUpdate[key] = value;
                }
            }

            if (newObjUpdate.equipo_local_id) {
                const equipoLocalExiste = await this.db.collection("equipo").findOne({_id: newObjUpdate.equipo_local_id});
                if (!equipoLocalExiste) {
                    throw new Error("El equipo local especificado no existe: " + objUpdate.equipo_local_id);
                } else if (newObjUpdate.equipo_local_id.toString() == partidoExiste.equipo_visitante_id.toString()) {
                    throw new Error("El equipo local especificado es el mismo equipo visitante ya registrado en el partido: " + partidoExiste.equipo_visitante_id);
                }
            }

            if (newObjUpdate.equipo_visitante_id) {
                const equipoVisitanteExiste = await this.db.collection("equipo").findOne({_id: newObjUpdate.equipo_visitante_id});
                if (!equipoVisitanteExiste) {
                    throw new Error("El equipo visitante especificado no existe: " + objUpdate.equipo_visitante_id);
                } else if (newObjUpdate.equipo_visitante_id.toString() == partidoExiste.equipo_local_id.toString()) {
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
                const schedulingConflict = await this.collection.findOne({fecha: newObjUpdate.fecha || partidoExiste.fecha, hora: newObjUpdate.hora || partidoExiste.hora, estadio_id: newObjUpdate.estadio_id || partidoExiste.estadio_id});
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

  // Caso de uso 4. Registro de Resultados /////////////////////////////////////////////////////////////////////////////////////////
  // Actor: Árbitro, Administrador de la Liga
  // Descripción: Permite registrar los resultados de los partidos.


  // funcion para poder actualizar los resultados de un partido en tiempo real:
  async addMatchResult(matchId, result) {
    await this.conexion.connect();
    // realizamos la verificacion de que el id del partido exista, si no existe no permitira actualizar nada
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }

    // si existe el partido procedemos mediante updateone y $set a actualizar el resultado anterior por el reciente
    const resultUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $set: { resultado: result } }
    );
    await this.conexion.close();
    return resultUpdate;
  }
  // ahora creamos la funcion para poder agregar tarjetas por faltas o acontecimientos dados en el partido
  async addCard(matchId, card) {
    await this.conexion.connect();
    // verificamos que el partido exista
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    // si existe mediante updateone y $push insertamos el nuevo array de objetos
    const cardUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $push: { tarjetas: { ...card, jugador_id: new ObjectId(card.jugador_id.$oid) } } }
    );
    await this.conexion.close();
    return cardUpdate;
  }
  //por ultimo creamos una funcion que le permita al arbitro o administrador poder agregar un incidente ocacionado en los partidos a nivel general
  async addIncident(matchId, incident) {
    await this.conexion.connect();
    //verificamos que exista el partido para poder agregar el incidente
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    // si existe mediante la funcion updateone y $push procedemos a crear un nuevo array de objetos especificando el incidente, esto en caso de que aun no allan incidentes
    const incidentUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $push: { incidentes: incident } }
    );
    await this.conexion.close();
    return incidentUpdate;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
