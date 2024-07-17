import { Connect } from "../../helpers/db/Connect.js";


export class Rol extends Connect {
  static instanceRol;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('rol');
    if (Rol.instanceRol) {
      return Rol.instanceRol;
    }
    Rol.instanceRol = this;
    return this;
  }

  async getAllRoles() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}