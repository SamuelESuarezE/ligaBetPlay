# Liga BetPlay

## **Developers**

- Camilo Esteban Concha Torres
- Samuel Enrique Suarez Estupiñan

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


