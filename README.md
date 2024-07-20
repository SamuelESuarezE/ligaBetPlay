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
