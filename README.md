# Liga BetPlay

## **Developers**

- Camilo Esteban Concha Torres
- Samuel Enrique Suarez Estupiñan

## Configuracion del archivo `.env`

Crea un archivo llamado `.env` en la raíz de tu proyecto y agrega las siguientes variables de entorno:

```javascript
MONGODB_HOST=mongodb://
MONGODB_USER=Samuel
MONGODB_PASS=3334
MONGODB_PORT=44256
MONGODB_CLUSTER=monorail.proxy.rlwy.net
MONGODB_DBNAME=LigaBetPlay
```

## Instalacion de las dependencias necesarias

 Nos aseguramos de instalar el paquete `mongodb` ejecutando:

```bash
npm install mongodb
```

## Ejecucion del proyecto

Para ejecutar el proyecto, nos aseguramos de que el archivo `.env` esté configurado correctamente y luego ejecutamos el siguiente comando:

```bash
node --env-file .env main.js
o simplemente:
npm run dev
```


## 1. Gestion de Equipos

**getAllTeams():** Obtiene todos los equipos.

```javascript
let obj = new Equipo();
console.log(await obj.getAllTeams());
```

**addTeam(params):** Añade un nuevo equipo. 
- ***Parametros obligatorios:*** nombre, ciudad, estadio_id y entrenador_id.


```javascript
let obj = new Equipo();
console.log(await obj.addTeam({
  nombre: "Nuevo FC",
  ciudad: "Nueva Ciudad",
  estadio_id: "123",
  entrenador_id: "456"
}));
```

**updateTeamById(params):** Actualiza un equipo por su ID.

- ***Parametros obligatorios:*** _id, objUpdate
- ***Parametros opcionales:*** objUpdate.nombre, objUpdate.ciudad, objUpdate.estadio_id, objUpdate.entrenador_id


```javascript
let obj = new Equipo();
console.log(await obj.updateTeamById({_id: "669a4add56ebba845724f2e4", objUpdate: {nombre: "Deportivo Cali"}}))
```

**deleteTeamById(params):** Elimina un equipo por su ID.

- ***Parametros obligatorios:*** _id


```javascript
let obj = new Equipo();
console.log(await obj.deleteTeamById({_id: "669bd3ac944f05d20e72ad6d"}))
```

## **2. Gestión de Jugadores**

**getAllPlayers():** Obtiene todos los jugadores.

```javascript
let obj = new Jugador();
console.log(await obj.getAllPlayers());
```

**addPlayer(player):** Añade un nuevo jugador.
* ***Parámetros:*** Un objeto con las propiedades del jugador

```javascript
let obj = new Jugador();
console.log(await obj.addPlayer({
  nombre: "Camilo Esteban",
  edad: 24,
  posición: "Defensa",
  nacionalidad: "Colombiano",
  equipo_id: {
    $oid: "669a4add56ebba845724f2e0"
  },
  numero_camiseta: 15,
  premios: []
}));
```

**updatePlayer(id, updatedPlayer):** Actualiza un jugador por su ID.
* ***Parámetros:*** 
  - id: Un objeto con la propiedad $oid que contiene el ID del jugador
  - updatedPlayer: Un objeto con las propiedades a actualizar

```javascript
let obj = new Jugador();
console.log(await obj.updatePlayer(
  { $oid: "669bed533bc60a7605bbde1c" },
  {
    edad: 26,
    numero_camiseta: 13
  }
));
```

**deletePlayer(id):** Elimina un jugador por su ID.
* ***Parámetros:*** Un objeto con la propiedad $oid que contiene el ID del jugador

```javascript
let obj = new Jugador();
console.log(await obj.deletePlayer({ $oid: "669bed533bc60a7605bbde1c" }));
```




## 3. Programacion de Partidos

**getAllMatchs():** Obtiene todos los partidos.

```javascript
let obj = new Partido();
console.log(await obj.getAllMatchs());
```

**addMatch(params):** Programa un nuevo partido. 
- ***Parametros obligatorios:*** equipo_local_id, equipo_visitante_id, fecha, hora, estadio_id y arbitro_id.


```javascript
let obj = new Partido();
console.log(await obj.addMatch({
  equipo_local_id: "669be6dae5247ae8f00ad1c0",
  equipo_visitante_id: "669a4add56ebba845724f2e1",
  fecha: "2024-07-25",
  hora: "20:00",
  estadio_id: "669a499e56ebba845724f2d7",
  arbitro_id: "6699bc620a398139ea78910d" 
}));
```

**updateMatchById(params):** Actualiza un partido por su ID.

- ***Parametros obligatorios:*** _id, objUpdate
- ***Parametros opcionales:*** objUpdate.equipo_local_id, objUpdate.equipo_visitante_id, objUpdate.fecha, objUpdate.hora, objUpdate.estadio_id, objUpdate.arbitro_id, objUpdate.estado


```javascript
let obj = new Partido();
console.log(await obj.updateMatchById({_id: "669a56da56ebba845724f312", objUpdate: {fecha: "2024-08-02",hora: "20:00"}}))
```

**deleteMatchById(params):** Elimina un partido por su ID.

- ***Parametros obligatorios:*** _id

```javascript
let obj = new Partido();
console.log(await obj.deleteMatchById({_id: "669c86364d847a241493fb97"}))
```


## **4. Registro de Resultados**

**addMatchResult(matchId, result):** Actualiza el resultado de un partido.
* ***Parámetros:*** 
  - matchId: Un objeto con la propiedad $oid que contiene el ID del partido
  - result: Un objeto con el resultado del partido

```javascript
let obj = new Partido();
console.log(await obj.addMatchResult(
  { $oid: "669a56da56ebba845724f318" },
  {
    goles_local: 0,
    goles_visitante: 0,
    resultado_final: "empate"
  }
));
```

**addCard(matchId, card):** Añade una tarjeta a un partido.
* ***Parámetros:*** 
  - matchId: Un objeto con la propiedad $oid que contiene el ID del partido
  - card: Un objeto con los detalles de la tarjeta

```javascript
let obj = new Partido();
console.log(await obj.addCard(
  { $oid: "669a56da56ebba845724f319" },
  {
    equipo: "local",
    jugador_id: { $oid: "669a4c6056ebba845724f2f5" },
    color: "roja",
    minuto: 80
  }
));
```

**addIncident(matchId, incident):** Añade un incidente a un partido.
* ***Parámetros:*** 
  - matchId: Un objeto con la propiedad $oid que contiene el ID del partido
  - incident: Un objeto con los detalles del incidente

```javascript
let obj = new Partido();
console.log(await obj.addIncident(
  { $oid: "669a56da56ebba845724f319" },
  {
    descripcion: "Lesión de jugador",
    minuto: 60
  }
));
```



## **6. Gestión de Noticias y Comunicados**

**getAllAnnouncements():** Obtiene todos los comunicados.

```javascript
let obj = new Comunicado();
console.log(await obj.getAllAnnouncements());
```


**addAnnouncement(announcement):** Añade un nuevo comunicado.
* ***Parámetros:*** Un objeto con las propiedades del comunicado

```javascript
let obj = new Comunicado();
console.log(await obj.addAnnouncement({
  titulo: "Nueva Noticia",
  contenido: "Contenido de la nueva noticia.",
  fecha_publicacion: "2024-07-20",
  destinatarios: "Aficionados"
}));
```

**updateAnnouncement(id, updatedAnnouncement):** Actualiza un comunicado existente.
* ***Parámetros:*** 
  - id: Un objeto con la propiedad $oid que contiene el ID del comunicado
  - updatedAnnouncement: Un objeto con las propiedades actualizadas del comunicado

```javascript
let obj = new Comunicado();
console.log(await obj.updateAnnouncement(
  { $oid: "669d6f842c3ccefddace270a" },
  {
    titulo: "Actualización de Noticia",
    contenido: "Contenido actualizado de la noticia.",
    fecha_publicacion: "2024-07-21",
    destinatarios: "Equipos"
  }
));
```

**deleteAnnouncement(id):** Elimina un comunicado existente.
* ***Parámetros:*** Un objeto con la propiedad $oid que contiene el ID del comunicado

```javascript
let obj = new Comunicado();
console.log(await obj.deleteAnnouncement({ $oid: "669d6f842c3ccefddace270a" }));
```

## 7. Gestión de Entrenadores

**getAllTrainers():** Obtiene todos los entrenadores.

```javascript
let obj = new Entrenador();
console.log(await obj.getAllTrainers());
```

**addTrainer(params):** Registra un nuevo entrenador. 
- ***Parametros obligatorios:*** nombre, email, telefono, experiencia
- El telefono debe iniciar por su respectivo prefijo. Ejemplo: "**+57**123213211"

```javascript
let obj = new Entrenador();
console.log(await obj.addTrainer({
  nombre: "Mariana Traslaviña",
  email: "mariana.traslavina@example.com",
  telefono: "+573244195352",
  experiencia: "10 años de experiencia como entrenador de clubes de alto rendimiento"
}))
```

**updateTrainerById(params):** Actualiza un entrenador por su ID.

- ***Parametros obligatorios:*** _id, objUpdate
- ***Parametros opcionales:*** objUpdate.nombre, objUpdate.email, objUpdate.telefono, objUpdate.experiencia .
- El telefono debe iniciar por su respectivo prefijo. Ejemplo: "**+57**123213211"

```javascript
let obj = new Entrenador();
console.log(await obj.updateTrainerById({_id: "6699bbfa0a398139ea789103", objUpdate: {email: "miguel.yolver@proton.me"}}))
```

**deleteTrainerById(params):** Elimina un entrenador por su ID.

- ***Parametros obligatorios:*** _id

```javascript
let obj = new Entrenador();
console.log(await obj.deleteTrainerById({_id: "669d54aaebd4389e51fd3c5d"}))
```


## **8. Gestión de Árbitros**

**addReferee(referee):** Añade un nuevo árbitro.

- ***Parámetros:*** Un objeto con las propiedades del árbitro

```javascript
let obj = new Arbitro();
console.log(await obj.addReferee({
  nombre: "Ricardo Pérez",
  email: "ricardo.perez@example.com",
  telefono: "+573020334455",
  experiencia: "7 años en torneos regionales"
}));
```

**updateReferee(id, updatedReferee):** Actualiza un árbitro existente.

- **Parámetros:**
  - id: Un objeto con la propiedad $oid que contiene el ID del árbitro
  - updatedReferee: Un objeto con las propiedades actualizadas del árbitro

```javascript
let obj = new Arbitro();
console.log(await obj.updateReferee(
  { $oid: "669eb787120e5a68b8874366" },
  {
    experiencia: "6 años en ligas internacionales"
  }
));
```

**deleteReferee(id):** Elimina un árbitro existente.

- ***Parámetros:*** Un objeto con la propiedad $oid que contiene el ID del árbitro

```javascript
let obj = new Arbitro();
console.log(await obj.deleteReferee({ $oid: "669eb787120e5a68b8874366" }));
```

## 9. Gestión de Estadios

**getAllStadiums():** Obtiene todos los estadios.

```javascript
let obj = new Estadio();
console.log(await obj.getAllStadiums());
```

**addStadium(params):** Registra un nuevo estadio. 
- ***Parametros obligatorios:*** nombre, ubicacion, capacidad_maxima

```javascript
let obj = new Estadio();
console.log(await obj.addStadium({nombre: "Estadio Ejemplo", ubicacion: "Bucaramanga", capacidad_maxima: 3000}))
```

**updateStadiumById(params):** Actualiza un estadio por su ID.

- ***Parametros obligatorios:*** _id, objUpdate
- ***Parametros opcionales:*** objUpdate.nombre, objUpdate.ubicacion, objUpdate.capacidad_maxima

```javascript
let obj = new Estadio();
console.log(await obj.updateStadiumById({_id: "669e477a6ba569d757350185", objUpdate: {nombre: "Estadio nuevo"}}))
```

**deleteStadiumById(params):** Elimina un estadio por su ID.

- ***Parametros obligatorios:*** _id

```javascript
let obj = new Estadio();
console.log(await obj.deleteStadiumById({_id: "669e4a7b3dbcee19f8ff5a77"}))

let obj = new Arbitro();
console.log(await obj.getAllTrainers());
```

