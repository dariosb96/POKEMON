const {Router} = require("express");
const { getPokemonsHandler } = require("../handlers/GetAllHandler");
const { GeTDetHandler } = require("../handlers/GetDetHandler");
const {create_Handler} = require("../handlers/createHandler")
const Pokemonrouter = Router();

Pokemonrouter.get("/", getPokemonsHandler);
Pokemonrouter.get("/:id", GeTDetHandler);
Pokemonrouter.post ("/", create_Handler);

module.exports = {
    Pokemonrouter,
}