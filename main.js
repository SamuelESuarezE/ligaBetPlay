import { Arbitro } from './js/model/Arbitro.js';
import { Comunicado } from './js/model/Comunicado.js';
import { Convocatoria } from './js/model/Convocatoria.js';
import { Entrada } from './js/model/Entrada.js';
import { Entrenador } from './js/model/Entrenador.js';
import { Entrenamiento } from './js/model/Entrenamiento.js';
import { Equipo } from './js/model/Equipo.js';
import { Estadio } from './js/model/Estadio.js';
import { Jugador } from './js/model/Jugador.js';
import { Lesion } from './js/model/Lesion.js';
import { Medio } from './js/model/Medio.js';
import { Partido } from './js/model/Partido.js';
import { Patrocinador } from './js/model/Patrocinador.js';
import { Rendimiento } from './js/model/Rendimiento.js';
import { Transferencia } from './js/model/Transferencia.js';

let obj;

// // Tests Arbitro
// obj = new Arbitro();
// // console.log(await obj.getAllReferees());
// obj.destructor();

// // Testss Comunicado
// obj = new Comunicado();
// // console.log(await obj.getAllAnnouncements());
// obj.destructor();

// // Tests Convocatoria
// obj = new Convocatoria();
// // console.log(await obj.getAllAnnouncements());
// obj.destructor();

// // Tests Entrada
// obj = new Entrada();
// // console.log(await obj.getAllTickets());
// obj.destructor();

// Tests Entrenador
obj = new Entrenador();
// * CASO DE USO 7: Gestión de Entrenadores
// console.log(await obj.getAllTrainers());
// console.log(await obj.addTrainer({nombre: "Mariana Traslaviña", email: "mariana.traslavina@example.com", telefono: "+573244195352", experiencia: "10 años de experiencia como entrenador de clubes de alto rendimiento"}))
// console.log(await obj.updateTrainerById({_id: "6699bbfa0a398139ea789103", objUpdate: {email: "miguel.yolver@proton.me"}}))
// console.log(await obj.deleteTrainerById({_id: "669d54aaebd4389e51fd3c5d"}))
obj.destructor();

// // Tests Entrenamiento
// obj = new Entrenamiento();
// // console.log(await obj.getAllTrainings());
// obj.destructor();

// Tests Equipo
obj = new Equipo();
// * CASO DE USO 1: Gestion de Equipos
// console.log(await obj.getAllTeams());
// console.log(await obj.addTeam({nombre: "Atletico Campuslands", ciudad: "Floridablanca", estadio_id: "669a499e56ebba845724f2d6", entrenador_id: "669d5354c2f98c89f4f7a41d"}));
// console.log(await obj.updateTeamById({_id: "669a4add56ebba845724f2e4", objUpdate: {nombre1: "Deportivo Cali"}}))
obj.destructor();

// Tests Estadio
obj = new Estadio();
// * CASO DE USO 9: Gestión de Estadios
// console.log(await obj.getAllStadiums());
// console.log(await obj.addStadium({nombre: "Estadio La Loquera", ubicacion: "Cuadrapicha", capacidad_maxima: 100}))
// console.log(await obj.updateStadiumById({_id: "669e477a6ba569d757350185", objUpdate: {nombre: "Estadio nuevo"}}))
// console.log(await obj.deleteStadiumById({_id: "669e4a7b3dbcee19f8ff5a77"}))
obj.destructor();

// // Tests Equipo
// obj = new Equipo();
// // console.log(await obj.getAllTeams());
// obj.destructor();

// // Tests Estadio
// obj = new Lesion();
// // console.log(await obj.getAllInjuries());
// obj.destructor();

// // Tests Medio
// obj = new Medio();
// // console.log(await obj.getAllMedias());
// obj.destructor();


// Tests Partido
obj = new Partido();
// * CASO DE USO 3: Programación de Partidos
// console.log(await obj.getAllMatchs());
// console.log(await obj.addMatch({ equipo_local_id: "669be6dae5247ae8f00ad1c0", equipo_visitante_id: "669a4add56ebba845724f2e1", fecha: "2024-07-25", hora: "20:00", estadio_id: "669a499e56ebba845724f2d7", arbitro_id: "6699bc620a398139ea78910d" }));
// console.log(await obj.updateMatchById({_id: "669a56da56ebba845724f312", objUpdate: {fecha: "2024-08-02",hora: "20:00"}}))
// console.log(await obj.deleteMatchById({_id: "669c86364d847a241493fb97"}))
obj.destructor();

// // Tests Patrocinador
// obj = new Patrocinador();
// // console.log(await obj.getAllSponsors());
// obj.destructor();

// // Tests Rendimiento
// obj = new Rendimiento();
// // console.log(await obj.getAllPerformances());
// obj.destructor();

// // Tests Transferencia
// obj = new Transferencia();
// // console.log(await obj.getAllTransfers());
// obj.destructor();






  //caso de uso 2. Gestión de Jugadores ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //Actor: Administrador de la Liga, Equipo Técnico
  //Descripción: Permite registrar, editar y eliminar jugadores de los equipos.


  // como tenemos distintas formas de implementar el caso 2 como primero creamos la funcion para agregar el nuevo jugador
  // teniendo encuenta sus validaciones
  async function testAddPlayer() {
    const jugadorObj = new Jugador();
    try {
        //aca agregamos todos los  items necesarios para crear el nuevo jugador 
      const nuevoJugador = {
        nombre: "Camilo Esteban",
        edad: 24,
        posición: "Defensa",
        nacionalidad: "Colombiano",
        equipo_id: {
          $oid: "669a4add56ebba845724f2e0"
        },
        numero_camiseta: 15,
        // premios es obsional por si el jugador a tenido premios si no se deja un array vacio
        premios: []
        // premios: [
        //     {
        //       nombre: "Máximo Goleador",
        //       descripcion: "Jugador con más goles en la temporada 2023",
        //       criterios: "Máximo número de goles anotados",
        //       fecha_premio: {
        //       $date: "2023-12-15T00:00:00.000Z"
        //       }
        //     }
        //   ]
      };
        // y agregamos el jugador correctamente
      const resultado = await jugadorObj.addPlayer(nuevoJugador);
      console.log(resultado);
    } catch (error) {
      console.error("Error al agregar jugador:", error.message);
    } finally {
      jugadorObj.destructor();
    }
  }
  // en esta funcion podemos actualizar el jugador corresponiente a su id
  async function testUpdatePlayer() {
    const jugadorObj = new Jugador();
    try {
      const jugadorId = { $oid: "669bed533bc60a7605bbde1c" }; // importante que este objectid exista sino no dejara actualizarlo
      const jugadorActualizado = {
        // actualizamos los datos que se deseen actualizar
        edad: 26, //cambio la edad
        numero_camiseta: 13,// cambio su numero de camiseta
      };
      // y si esta todo bien actualizamos efectivamente 
      const resultado = await jugadorObj.updatePlayer(jugadorId, jugadorActualizado);
      console.log(resultado);
    } catch (error) {
      console.error("Error al actualizar jugador:", error.message);
    } finally {
      jugadorObj.destructor();
    }
  }
  // por ultimo tenemos la funcion para eliminar el jugador por medio e su id
  async function testDeletePlayer() {
    const jugadorObj = new Jugador();
    try {
      const jugadorEliminarId = { $oid: "669bed533bc60a7605bbde1c" }; // importante
      // si existe lo dejara eliminar correctamente
      const resultado = await jugadorObj.deletePlayer(jugadorEliminarId);
      console.log(resultado);
    } catch (error) {
      console.error("Error al eliminar jugador:", error.message);
    } finally {
      jugadorObj.destructor();
    }
  }
  // y aca finalmente podemos descomentar las funciones dependiendo de cual requiera usar el administrador o el equipo tecnico y usar: npm run dev en la consola:

  // testAddPlayer(); // agregar un jugador
  // testUpdatePlayer(); // actualizar datos del jugador
  // testDeletePlayer(); // eliminar un jugador
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









  
  // Caso de uso 4. Registro de Resultados /////////////////////////////////////////////////////////////////////////////////////////
  // Actor: Árbitro, Administrador de la Liga
  // Descripción: Permite registrar los resultados de los partidos.


  // creamos la funcion para que el arbitro o administrador puedan realizar la correcta actualizacion o agregacion de resultados a un partido
  async function testAddMatchResult() {
    const partidoObj = new Partido();
    try {
      const partidoId = { $oid: "669a56da56ebba845724f318" }; // importante que el id exista sino saldra error
      // datos requeridos para la actualizacion:
      const nuevoResultado = {
        goles_local: 0,
        goles_visitante: 0,
        resultado_final: "empate" // aca solo se permiten estos datos: victoria_local, victoria_visitante, empate, por definir, cancelado (si no se pone tal cual saldra error de documento)
      };
      // y agregamos los resultados :
      const resultado = await partidoObj.addMatchResult(partidoId, nuevoResultado);
      console.log(resultado);
    } catch (error) {
      console.error("Error al agregar resultado del partido:", error.message);
    } finally {
      partidoObj.destructor();
    }
  }
  // creamos la funcion para poder agregar tarjetas en un partido
  async function testAddCard() {
    const partidoObj = new Partido();
    try {
      // datos necesarios para la agregacion
      const partidoId = { $oid: "669a56da56ebba845724f319" }; // verificamos que el id exista correctamente
      const nuevaTarjeta = {
        equipo: "local",
        jugador_id: { $oid: "669a4c6056ebba845724f2f5" },// que el id sea correcto
        color: "roja",
        minuto: 80
      };
      // finalmente agregamos la nueva tarjeta
      const resultado = await partidoObj.addCard(partidoId, nuevaTarjeta);
      console.log(resultado);
    } catch (error) {
      console.error("Error al agregar tarjeta al partido:", error.message);
    } finally {
      partidoObj.destructor();
    }
  }
    // creamos la funcion para poder agregar un nuevo incidente
    async function testAddIncident() {
      const partidoObj = new Partido();
      try {
        const partidoId = { $oid: "669a56da56ebba845724f319" }; // que el id exista correctamente
        // datos necesarios para la inserccion
        const nuevoIncidente = {
          descripcion: "Lesión de jugador",
          minuto: 60
        };
        //finalmente agregamos el nuevo incidente
        const resultado = await partidoObj.addIncident(partidoId, nuevoIncidente);
        console.log(resultado);
      } catch (error) {
        console.error("Error al agregar incidente al partido:", error.message);
      } finally {
        partidoObj.destructor();
      }
    }
  // aca podemos descomentar las funciones que desea usar el arbitro o el administrador:

  // testAddMatchResult(); //agregar/actualizar resultados de un partido
  // testAddCard(); //agregar tarjetas a un partido
  // testAddIncident() //agregar un incidente a un partido
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7










  

  // Caso de uso 6. Gestión de Noticias y Comunicados ////////////////////////////////////////////////////////////////////////////////////////7
  // Actor: Administrador de la Liga, Periodista
  // Descripción: Permite registrar, editar y eliminar noticias y comunicados.


  // creamos la funcion que nos permitira crear un nuevo comunicao
  async function testAddAnnouncement() {
    obj = new Comunicado();
    try {
      //datos importantes para la creacion del comunicado
      const nuevoComunicado = {
        titulo: "Nueva Noticia",
        contenido: "Contenido de la nueva noticia.",
        fecha_publicacion: "2024-07-20",
        destinatarios: "Aficionados"
      };
      //si todo esta bien lo agregamos:
      const resultado = await obj.addAnnouncement(nuevoComunicado);
      console.log(resultado);
    } catch (error) {
      console.error("Error al agregar comunicado:", error.message);
    } finally {
      obj.destructor();
    }
  }
  // luego una funcion para que el administrador o el periodista puedan actualizar ese comunicado creado o cualquiero otro
  async function testUpdateAnnouncement() {
    obj = new Comunicado();
    try {
      // datos importantes:
      const comunicadoId = { $oid: "669d6f842c3ccefddace270a" }; // que exista ese sino no servira 
      const comunicadoActualizado = {
        // estos datos serian a gusto del admin o periodista para cambiarlos
        titulo: "Actualización de Noticia",
        contenido: "Contenido actualizado de la noticia.",
        fecha_publicacion: "2024-07-21",
        destinatarios: "Equipos"
      };
      // si todo sale bien podra actualizarlos
      const resultado = await obj.updateAnnouncement(comunicadoId, comunicadoActualizado);
      console.log(resultado);
    } catch (error) {
      console.error("Error al actualizar comunicado:", error.message);
    } finally {
      obj.destructor();
    }
  }
  // por ultimo una funcion que nos permitira eliminar los comunicados que existan
  async function testDeleteAnnouncement() {
    obj = new Comunicado();
    try {
      const comunicadoEliminarId = { $oid: "669d6f842c3ccefddace270a" }; // tiene que existir este id
      const resultado = await obj.deleteAnnouncement(comunicadoEliminarId);
      console.log(resultado);
    } catch (error) {
      //si sale todo bien le permitira elimanr al periodista o amdin encargado
      console.error("Error al eliminar comunicado:", error.message);
    } finally {
      obj.destructor();
    }
  }
  
  // descomentar la funcion para utilizarla:
  // testAddAnnouncement(); // agregar un comunicado
  // testUpdateAnnouncement(); // actualizar un comunicado
  // testDeleteAnnouncement(); // eliminar un comunicado
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7





  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
  // Caso de uso 8. Gestión de Árbitros
  // Actor: Administrador de la Liga
  // Descripción: Permite registrar, editar y eliminar árbitros para los partidos.

  // comenzamos creando la funcion en la cual ingresaremos los datos para crear un nuevo arbitro
 async function testAddReferee() {
    const arbitroObj = new Arbitro();
    try {
        // estos son los datos requeridos por la liga para la base de datos:
      const nuevoArbitro = {
        nombre: "Ricardo Pérez",
        email: "ricardo.perez@example.com", // este email es unico y no debe ser usado de nuevo
        telefono: "+573020334455",
        experiencia: "7 años en torneos regionales"
      };
      // si todo es correcto procedemos a crear el nuevo arbitro
      const resultado = await arbitroObj.addReferee(nuevoArbitro);
      console.log(resultado);
    } catch (error) {
      console.error("Error al agregar árbitro:", error.message);
    } finally {
      arbitroObj.destructor();
    }
  }
  
  // luego tenemos la funcion que le permitira al administrador actualizar los datos de un arbirtro
  async function testUpdateReferee() {
    const arbitroObj = new Arbitro();
    try {
      const arbitroId = { $oid: "669eb787120e5a68b8874366" }; // este id es muy importante, si no existe no podremos actualizar de ninguna otra forma
      const arbitroActualizado = {
        experiencia: "6 años en ligas internacionales" // en este caso actualizamos la experiencia pero se puede actualizar cualquier dato
      };
      // si todo es correcto procederemos a actualizar los datos del arbitro
      const resultado = await arbitroObj.updateReferee(arbitroId, arbitroActualizado);
      console.log(resultado);
    } catch (error) {
      console.error("Error al actualizar árbitro:", error.message);
    } finally {
      arbitroObj.destructor();
    }
  }
  
  // por ultimo la funcion que le permitira al administrador poder eliminar un arbitro ya creado
  async function testDeleteReferee() {
    const arbitroObj = new Arbitro();
    try {
      const arbitroEliminarId = { $oid: "669eb787120e5a68b8874366" };  // este id es muy importante, si no existe no podremos eliminar ningun arbitro de ninguna otra forma
        // si todo es correcto procedemos a eliminar el arbitro exitosamente:
      const resultado = await arbitroObj.deleteReferee(arbitroEliminarId);
      console.log(resultado);
    } catch (error) {
      console.error("Error al eliminar árbitro:", error.message);
    } finally {
      arbitroObj.destructor();
    }
  }
  
  // y aqui descomentamos las funciones que el aministrador desee utilizar:
  
  // testAddReferee(); // Agregar un árbitro
  // testUpdateReferee(); // Actualizar un árbitro
  // testDeleteReferee(); // Eliminar un árbitro
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////