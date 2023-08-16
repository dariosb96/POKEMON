const { Router } = require("express");
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Pokemonrouter }  = require("./router_pokemon");
const { typerouter }  = require("./router_types");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", Pokemonrouter);

router.use("/types", typerouter);

module.exports = router;
