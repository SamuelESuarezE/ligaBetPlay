import { Connect } from "../../helpers/db/Connect.js";

export class Convocatoria extends Connect {
  static instanceConvocatoria;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('convocatoria');
    if (Convocatoria.instanceConvocatoria) {
      return Convocatoria.instanceConvocatoria;
    }
    Convocatoria.instanceConvocatoria = this;
    return this;
  }

  async getAllAnnouncements() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}
