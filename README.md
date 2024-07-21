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
