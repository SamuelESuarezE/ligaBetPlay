import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb";

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

  
  // Caso de uso 8. Gestión de Árbitros
  // Actor: Administrador de la Liga
  // Descripción: Permite registrar, editar y eliminar árbitros para los partidos.

   // Comenzamos creano la funcion para agregar un nuevo arbitro a la base de datos
   async addReferee(referee) {
    await this.conexion.connect();
    // buscamos en la base de atos el email del arbitro para que si ya existe no permita crearlo con ese mismo email
    const existingReferee = await this.collection.findOne({
      email: referee.email
    });
    if (existingReferee) {
      await this.conexion.close();
      throw new Error("El árbitro ya existe.");
    }
    //si no existe un arbitro con ese email procedemos a crear el nuevo arbitro 
    const result = await this.collection.insertOne(referee);
    await this.conexion.close();
    return result;
  }

  // ahora creamos la funcion que le permitira al aministrador actualizar los datos de un arbitro, los datos se actualizan segun sea necesario
  async updateReferee(id, updatedReferee) {
    await this.conexion.connect();
    // buscamos por medio el id unico de ese arbitro que exista para poder actualizarlo
    const objectId = new ObjectId(id.$oid);
    const existingReferee = await this.collection.findOne({ _id: objectId });
    if (!existingReferee) {
      //si no existe no nos dejara actualizar nada
      await this.conexion.close();
      throw new Error("El árbitro no existe.");
    }
    //si existe mediante updateone y $set actualizamos los datos deseados
    const result = await this.collection.updateOne(
      { _id: objectId },
      { $set: updatedReferee }
    );
    await this.conexion.close();
    return result;
  }

  // y por ultimo creamos una funcion que nos permita eliminar un arbitro ya existente
  async deleteReferee(id) {
    await this.conexion.connect();
    // realizamos la busquqeda del arbitro que deseamos actualizar por medio de su id
    const objectId = new ObjectId(id.$oid);
    const existingReferee = await this.collection.findOne({ _id: objectId });
    if (!existingReferee) {
      //si no existe no nos dejara eliminar nada
      await this.conexion.close();
      throw new Error("El árbitro no existe.");
    }
    //si existe procedemos a eliminar ese arbitro mediante deleteone
    const result = await this.collection.deleteOne({ _id: objectId });
    await this.conexion.close();
    return result;
  }

}
