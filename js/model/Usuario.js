import { Connect } from "../../helpers/db/Connect.js";


export class Usuario extends Connect {
  static instanceUsuario;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('usuario');
    if (Usuario.instanceUsuario) {
      return Usuario.instanceUsuario;
    }
    Usuario.instanceUsuario = this;
    return this;
  }

  async getAllUsers() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}