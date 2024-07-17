import { Connect } from "../../helpers/db/Connect.js";


export class Transferencia extends Connect {
  static instanceTransferencia;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('transferencia');
    if (Transferencia.instanceTransferencia) {
      return Transferencia.instanceTransferencia;
    }
    Transferencia.instanceTransferencia = this;
    return this;
  }

  async getAllTransfers() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}