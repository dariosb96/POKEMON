const {Router} = require("express");
const {GetTypes, PostTypeHandler }  = require("../handlers/typesHandler");
const typerouter = Router();

//tura para obtener los tipos de pokemon
typerouter.get("/", GetTypes);

//ruta para crear un nuevo tipo de pokemon
typerouter.post("/", PostTypeHandler);

module.exports = {typerouter};