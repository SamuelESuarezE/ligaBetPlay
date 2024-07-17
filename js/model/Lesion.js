import { Connect } from "../../helpers/db/Connect.js";


export class Lesion extends Connect {
  static instanceLesion;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('lesion');
    if (Lesion.instanceLesion) {
      return Lesion.instanceLesion;
    }
    Lesion.instanceLesion = this;
    return this;
  }

  async getAllInjuries() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}