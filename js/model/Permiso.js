import { Connect } from "../../helpers/db/Connect.js";


export class Permiso extends Connect {
  static instancePermiso;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('permiso');
    if (Permiso.instancePermiso) {
      return Permiso.instancePermiso;
    }
    Permiso.instancePermiso = this;
    return this;
  }

  async getAllPermissions() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}