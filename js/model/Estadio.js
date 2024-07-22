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

    async updateStadiumById({_id, objUpdate}) {
        try {
            await this.conexion.connect()

            const stadiumExists = await this.collection.findOne({_id: new ObjectId(_id)})
            if (!stadiumExists) {
                throw new Error("El estadio especificado no existe: " + _id)
            }
            const atributosPermitidos = ["nombre", "ubicacion", "capacidad_maxima"]

            for (let [key, value] of Object.entries(objUpdate)) {
                if (!atributosPermitidos.includes(key)) {
                    throw new Error("Atributo no permitido: " + key)
                }

                if (key == "capacidad_maxima" && value < 0) {
                    throw new Error("La capacidad máxima no puede ser negativa: " + value)
                }
            }

            await this.collection.updateOne({ _id: new ObjectId(_id) }, {$set: objUpdate})

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
}
