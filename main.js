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

// Tests Arbitro
obj = new Arbitro();
// console.log(await obj.getAllReferees());
obj.destructor();

// Testss Comunicado
obj = new Comunicado();
// console.log(await obj.getAllAnnouncements());
obj.destructor();

// Tests Convocatoria
obj = new Convocatoria();
// console.log(await obj.getAllAnnouncements());
obj.destructor();

// Tests Entrada
obj = new Entrada();
// console.log(await obj.getAllTickets());
obj.destructor();

// Tests Entrenador
obj = new Entrenador();
// * CASO DE USO 7: Gestión de Entrenadores
// console.log(await obj.getAllTrainers());
// console.log(await obj.addTrainer({nombre: "Mariana Traslaviña", email: "mariana.traslavina@example.com", telefono: "+573244195352", experiencia: "10 años de experiencia como entrenador de clubes de alto rendimiento"}))
// console.log(await obj.updateTrainerById({_id: "6699bbfa0a398139ea789103", objUpdate: {email: "miguel.yolver@proton.me"}}))
// console.log(await obj.deleteTrainerById({_id: "669d54aaebd4389e51fd3c5d"}))
obj.destructor();

// Tests Entrenamiento
obj = new Entrenamiento();
// console.log(await obj.getAllTrainings());
obj.destructor();

// Tests Equipo
obj = new Equipo();
// * CASO DE USO 1: Gestion de Equipos
// console.log(await obj.getAllTeams());
// console.log(await obj.addTeam({nombre: "Atletico Campuslands", ciudad: "Floridablanca", estadio_id: "669a499e56ebba845724f2d6", entrenador_id: "669d5354c2f98c89f4f7a41d"}));
// console.log(await obj.updateTeamById({_id: "669a4add56ebba845724f2e4", objUpdate: {nombre1: "Deportivo Cali"}}))
// console.log(await obj.deleteTeamById({_id: "669bd3ac944f05d20e72ad6d"}))
obj.destructor();

// Tests Estadio
obj = new Estadio();
// console.log(await obj.getAllStadiums());
obj.destructor();

// Tests Jugador
obj = new Jugador();
// console.log(await obj.getAllPlayers());
obj.destructor();

// Tests Lesion
obj = new Lesion();
// console.log(await obj.getAllInjuries());
obj.destructor();

// Tests Medio
obj = new Medio();
// console.log(await obj.getAllMedias());
obj.destructor();

// Tests Partido
obj = new Partido();
// * CASO DE USO 3: Programación de Partidos
// console.log(await obj.getAllMatchs());
// console.log(await obj.addMatch({ equipo_local_id: "669be6dae5247ae8f00ad1c0", equipo_visitante_id: "669a4add56ebba845724f2e1", fecha: "2024-07-25", hora: "20:00", estadio_id: "669a499e56ebba845724f2d7", arbitro_id: "6699bc620a398139ea78910d" }));
// console.log(await obj.updateMatchById({_id: "669a56da56ebba845724f312", objUpdate: {fecha: "2024-08-02",hora: "20:00"}}))
// console.log(await obj.deleteMatchById({_id: "669c86364d847a241493fb97"}))
obj.destructor();

// Tests Patrocinador
obj = new Patrocinador();
// console.log(await obj.getAllSponsors());
obj.destructor();

// Tests Rendimiento
obj = new Rendimiento();
// console.log(await obj.getAllPerformances());
obj.destructor();

// Tests Transferencia
obj = new Transferencia();
// console.log(await obj.getAllTransfers());
obj.destructor();