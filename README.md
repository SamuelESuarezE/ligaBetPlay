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

