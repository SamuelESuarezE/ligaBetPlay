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

// // Tests Entrenador
// obj = new Entrenador();
// // console.log(await obj.getAllTrainers());
// obj.destructor();

// // Tests Entrenamiento
// obj = new Entrenamiento();
// // console.log(await obj.getAllTrainings());
// obj.destructor();

// // Tests Equipo
// obj = new Equipo();
// // console.log(await obj.getAllTeams());
// obj.destructor();

// // Tests Estadio
// obj = new Estadio();
// // console.log(await obj.getAllStadiums());
// obj.destructor();

// // Tests Jugador
// obj = new Jugador();
// // console.log(await obj.getAllPlayers());
// obj.destructor();

// // Tests Lesion
// obj = new Lesion();
// // console.log(await obj.getAllInjuries());
// obj.destructor();

// // Tests Medio
// obj = new Medio();
// // console.log(await obj.getAllMedias());
// obj.destructor();

// // Tests Partido
// obj = new Partido();
// // console.log(await obj.getAllMatchs());
// obj.destructor();

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