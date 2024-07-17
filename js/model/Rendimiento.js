import { Connect } from "../../helpers/db/Connect.js";


export class Rendimiento extends Connect {
  static instanceRendimiento;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('rendimiento');
    if (Rendimiento.instanceRendimiento) {
      return Rendimiento.instanceRendimiento;
    }
    Rendimiento.instanceRendimiento = this;
    return this;
  }

  async getAllPerformances() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}