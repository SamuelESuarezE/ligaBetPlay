import { Connect } from "../../helpers/db/Connect.js";


export class Patrocinador extends Connect {
  static instancePatrocinador;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('patrocinador');
    if (Patrocinador.instancePatrocinador) {
      return Patrocinador.instancePatrocinador;
    }
    Patrocinador.instancePatrocinador = this;
    return this;
  }

  async getAllSponsors() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}