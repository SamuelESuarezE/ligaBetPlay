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

            const estadioExiste = await this.db.collection("estadio").findOne({_id: new ObjectId(estadio_id)});
            if (!estadioExiste) {
                throw new Error("El estadio especificado no existe: " + estadio_id);
            }

            const arbitroExiste = await this.db.collection("arbitro").findOne({_id: new ObjectId(arbitro_id)});
            if (!arbitroExiste) {
                throw new Error("El arbitro especificado no existe: " + arbitro_id);
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

    async updateMatchById({_id, objUpdate}) {
        try {
            await this.conexion.connect();
            
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
                } else {
                    newObjUpdate[key] = value;
                } 
            }

            if (newObjUpdate.equipo_local_id) {
                const equipoLocalExiste = await this.db.collection("equipo").findOne({_id: newObjUpdate.equipo_local_id});
                if (!equipoLocalExiste) {
                    throw new Error("El equipo local especificado no existe: " + objUpdate.equipo_local_id);
                }
            }

            if (newObjUpdate.equipo_visitante_id) {
                const equipoVisitanteExiste = await this.db.collection("equipo").findOne({_id: newObjUpdate.equipo_visitante_id});
                if (!equipoVisitanteExiste) {
                    throw new Error("El equipo visitante especificado no existe: " + objUpdate.equipo_visitante_id);
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

            const newPartido = await this.collection.updateOne({_id: new ObjectId(_id)}, { $set: newObjUpdate });
            
            if (newPartido.matchedCount === 0) {
                throw new Error("El partido especificado no existe: " + _id);
            }

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
}
