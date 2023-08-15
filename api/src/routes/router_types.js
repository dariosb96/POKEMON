const {Router} = require("express");
const {GetTypes }  = require("../handlers/typesHandler");
const typerouter = Router();

typerouter.get("/", GetTypes);

module.exports = {typerouter};