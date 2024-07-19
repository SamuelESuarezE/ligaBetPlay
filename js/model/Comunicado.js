import { Connect } from "../../helpers/db/Connect.js";


export class Comunicado extends Connect {
  static instanceComunicado;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('comunicado');
    if (Comunicado.instanceComunicado) {
      return Comunicado.instanceComunicado;
    }
    Comunicado.instanceComunicado = this;
    return this;
  }

  async getAllAnnouncements() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}
