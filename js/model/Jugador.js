import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb"; // agregamos ObjectId para poder actualizar y eliminar por id de jugador

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
  //caso de uso 2. Gestión de Jugadores /////////////////////////////////////////////////////////////////////////////////////////77
  //Actor: Administrador de la Liga, Equipo Técnico
  //Descripción: Permite registrar, editar y eliminar jugadores de los equipos.

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

  // ahora creamos la funcion para actualizar un jugador creao previamente o ya creado anteriormente
  async updatePlayer(id, updatedPlayer) {
    await this.conexion.connect();
    //en donde tambien realizamos la validacion del jugador que queremos actualizar por medio e su ObjectId para que si no existe no permita actualizar. 
    const objectId = new ObjectId(id.$oid);
    const existingPlayer = await this.collection.findOne({ _id: objectId });
    //si no existe no dejara actualizar nada
    if (!existingPlayer) {
      await this.conexion.close();
      throw new Error("El jugador no existe.");
    }
    // si existe por medio del ObjectId entonces mediante la funcion updateone y $set realizaremos la correcta actualizacion
    const result = await this.collection.updateOne(
      { _id: objectId },
      { $set: updatedPlayer }
    );
    await this.conexion.close();
    return result;
  }
  // con esta funcion el administraor o equipo tecnico podra tambien eliminar un jugador que exista.
  async deletePlayer(id) {
    await this.conexion.connect();
    // validamos que el jugador exista por medio de su ObjectId
    const objectId = new ObjectId(id.$oid);
    const existingPlayer = await this.collection.findOne({ _id: objectId });
    // si no existe no nos dejara eliminar nada
    if (!existingPlayer) {
      await this.conexion.close();
      throw new Error("El jugador no existe.");
    }
    // si existe mediante deleteone y el id del jugador lo dejara eliminar correctamente.
    const result = await this.collection.deleteOne({ _id: objectId });
    await this.conexion.close();
    return result;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}