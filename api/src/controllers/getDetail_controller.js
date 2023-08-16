const axios = require('axios');
const {Pokemon, Type } = require("../db");
const {getAllPokemons} = require("./getAll_controller");

const URL = "https://pokeapi.co/api/v2/pokemon/";
//funcion para buscar un pokemon por su id
const getById = async (id) =>{

  //invoca al controlador que obtiene todos los pokemons
   const AllPokemons = await getAllPokemons();

   //buscar el pokemon que coincida con el id
   const Pokemon = AllPokemons.find((i)=> i.id.toString() === id);

   return Pokemon;


 };

module.exports = {getById};