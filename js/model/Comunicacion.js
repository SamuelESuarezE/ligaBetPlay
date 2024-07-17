import { Connect } from "../../helpers/db/Connect.js";


export class Comunicacion extends Connect {
  static instanceComunicacion;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('comunicacion');
    if (Comunicacion.instanceComunicacion) {
      return Comunicacion.instanceComunicacion;
    }
    Comunicacion.instanceComunicacion = this;
    return this;
  }

  async getAllMessages() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}
