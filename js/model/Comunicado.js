import { Connect } from "../../helpers/db/Connect.js";
import { ObjectId } from "mongodb";


export class Comunicado extends Connect {
  static instanceComunicado;
  db;
  collection;

  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('comunicado');
    if (Comunicado.instanceComunicado) {
      return Comunicado.instanceComunicado;
    }
    Comunicado.instanceComunicado = this;
    return this;
  }

  async getAllAnnouncements() {
    await this.conexion.connect();
    const data = await this.collection.find().toArray();
    await this.conexion.close();
    return data;
  }


  // Caso de uso 6. Gestión de Noticias y Comunicados
  // Actor: Administrador de la Liga, Periodista
  // Descripción: Permite registrar, editar y eliminar noticias y comunicados.

  // Función para agregar un nuevo comunicado
  async addAnnouncement(announcement) {
    await this.conexion.connect();
    // Verificamos que el comunicado no exista ya mediante su título y fecha de publicación
    const existingAnnouncement = await this.collection.findOne({
      titulo: announcement.titulo,
      fecha_publicacion: announcement.fecha_publicacion,
    });
    if (existingAnnouncement) {
      await this.conexion.close();
      throw new Error("El comunicado ya existe.");
    }
    // Agregamos el nuevo comunicado
    const result = await this.collection.insertOne(announcement);
    await this.conexion.close();
    return result;
  }

  // Función para que el administraor o el peridista actualize un comunicado existente
  async updateAnnouncement(id, updatedAnnouncement) {
    await this.conexion.connect();
    // valiamos que  exista
    const objectId = new ObjectId(id.$oid);
    const existingAnnouncement = await this.collection.findOne({ _id: objectId });
    if (!existingAnnouncement) {
      await this.conexion.close();
      throw new Error("El comunicado no existe.");
    }
    // si existe actualizamos los datos
    const result = await this.collection.updateOne(
      { _id: objectId },
      { $set: updatedAnnouncement }
    );
    await this.conexion.close();
    return result;
  }

  // Función para eliminar un comunicado existente
  async deleteAnnouncement(id) {
    await this.conexion.connect();
    //validamos que exista el comunicado mediante si id
    const objectId = new ObjectId(id.$oid);
    const existingAnnouncement = await this.collection.findOne({ _id: objectId });
    if (!existingAnnouncement) {
      await this.conexion.close();
      throw new Error("El comunicado no existe.");
    }
    // si existe lo eliminamos
    const result = await this.collection.deleteOne({ _id: objectId });
    await this.conexion.close();
    return result;
  }
}
