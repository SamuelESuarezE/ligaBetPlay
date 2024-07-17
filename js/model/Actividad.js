import { Connect } from "../../helpers/db/Connect.js";


export class Actividad extends Connect {
  static instanceActividad;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('actividad');
    if (Actividad.instanceActividad) {
      return Actividad.instanceActividad;
    }
    Actividad.instanceActividad = this;
    return this;
  }

  async getAllActivities() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}
