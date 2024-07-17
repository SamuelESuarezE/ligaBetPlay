import { Connect } from "../../helpers/db/Connect.js";


export class Equipo extends Connect {
  static instanceEquipo;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('equipo');
    if (Equipo.instanceEquipo) {
      return Equipo.instanceEquipo;
    }
    Equipo.instanceEquipo = this;
    return this;
  }

  async getAllTeams() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}