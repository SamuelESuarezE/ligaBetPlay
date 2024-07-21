import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb";


export class Partido extends Connect {
  static instancePartido;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('partido');
    if (Partido.instancePartido) {
      return Partido.instancePartido;
    }
    Partido.instancePartido = this;
    return this;
  }

  async getAllMatchs() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }

  // Caso de uso 4. Registro de Resultados /////////////////////////////////////////////////////////////////////////////////////////
  // Actor: Árbitro, Administrador de la Liga
  // Descripción: Permite registrar los resultados de los partidos.


  // funcion para poder actualizar los resultados de un partido en tiempo real:
  async addMatchResult(matchId, result) {
    await this.conexion.connect();
    // realizamos la verificacion de que el id del partido exista, si no existe no permitira actualizar nada
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }

    // si existe el partido procedemos mediante updateone y $set a actualizar el resultado anterior por el reciente
    const resultUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $set: { resultado: result } }
    );
    await this.conexion.close();
    return resultUpdate;
  }
  // ahora creamos la funcion para poder agregar tarjetas por faltas o acontecimientos dados en el partido
  async addCard(matchId, card) {
    await this.conexion.connect();
    // verificamos que el partido exista
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    // si existe mediante updateone y $push insertamos el nuevo array de objetos
    const cardUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $push: { tarjetas: { ...card, jugador_id: new ObjectId(card.jugador_id.$oid) } } }
    );
    await this.conexion.close();
    return cardUpdate;
  }
  //por ultimo creamos una funcion que le permita al arbitro o administrador poder agregar un incidente ocacionado en los partidos a nivel general
  async addIncident(matchId, incident) {
    await this.conexion.connect();
    //verificamos que exista el partido para poder agregar el incidente
    const objectId = new ObjectId(matchId.$oid);
    const existingMatch = await this.collection.findOne({ _id: objectId });

    if (!existingMatch) {
      await this.conexion.close();
      throw new Error("El partido no existe.");
    }
    // si existe mediante la funcion updateone y $push procedemos a crear un nuevo array de objetos especificando el incidente, esto en caso de que aun no allan incidentes
    const incidentUpdate = await this.collection.updateOne(
      { _id: objectId },
      { $push: { incidentes: incident } }
    );
    await this.conexion.close();
    return incidentUpdate;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}