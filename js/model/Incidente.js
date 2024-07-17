import { Connect } from "../../helpers/db/Connect.js";


export class Incidente extends Connect {
  static instanceIncidente;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('incidente');
    if (Incidente.instanceIncidente) {
      return Incidente.instanceIncidente;
    }
    Incidente.instanceIncidente = this;
    return this;
  }

  async getAllIncidents() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}