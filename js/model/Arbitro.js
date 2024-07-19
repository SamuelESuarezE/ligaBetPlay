import { Connect } from "../../helpers/db/Connect.js";


export class Arbitro extends Connect {
  static instanceReferee;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('arbitro');
    if (Arbitro.instanceReferee) {
      return Arbitro.instanceReferee;
    }
    Arbitro.instanceReferee = this;
    return this;
  }

  async getAllReferees() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}
