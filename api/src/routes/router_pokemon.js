const {Router} = require("express");
const { getPokemonsHandler } = require("../handlers/GetAllHandler");
const { GeTDetHandler } = require("../handlers/GetDetHandler");
const {create_Handler} = require("../handlers/createHandler")

// Crear un enrutador para las rutas relacionadas con los Pokémon
const Pokemonrouter = Router();

// Ruta para obtener todos los Pokémon
Pokemonrouter.get("/", getPokemonsHandler);

// Ruta para obtener detalles de un Pokémon por su ID
Pokemonrouter.get("/:id", GeTDetHandler);

// Ruta para crear un nuevo Pokémon
Pokemonrouter.post("/", create_Handler);

module.exports = {
  Pokemonrouter,
};