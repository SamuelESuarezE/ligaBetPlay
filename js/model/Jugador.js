import { Connect } from "../../helpers/db/Connect.js";


export class Jugador extends Connect {
  static instanceJugador;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('jugador');
    if (Jugador.instanceJugador) {
      return Jugador.instanceJugador;
    }
    Jugador.instanceJugador = this;
    return this;
  }

  async getAllPlayers() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

}