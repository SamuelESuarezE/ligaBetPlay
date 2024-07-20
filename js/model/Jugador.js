import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb"; // agregamos ObjectId para poder validar,actualizar, eliminar, agregar por id de jugador

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
  //caso de uso 2. Gestión de Jugadores
 //Actor: Administrador de la Liga, Equipo Técnico

  // funcion para agregar o crear un nuevo jugador en la base de datos
  async addPlayer(player) {
    await this.conexion.connect();
    // creamos esta funcion donde verificamos que el jugador exista mediante la funcion de buscar(findone) y verificamos que existan 2 atributos escenciales para el jugador
    const existingPlayer = await this.collection.findOne({
      nombre: player.nombre,
      numero_camiseta: player.numero_camiseta,
    });
    // si ya existe el jugador con el mismo nombre y camisa no dejara crearlo
    if (existingPlayer) {
      await this.conexion.close();
      throw new Error("El jugador ya existe en el equipo.");
    }
    // si no existe realizamos la correcta agregacion del nuevo jugador
    const result = await this.collection.insertOne(player);
    await this.conexion.close();
    return result;
  }

}