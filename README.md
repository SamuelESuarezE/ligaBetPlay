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

