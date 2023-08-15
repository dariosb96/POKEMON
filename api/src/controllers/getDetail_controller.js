
const axios = require('axios');
const {Pokemon, Type } = require("../db");
const {getAllPokemons} = require("./getAll_controller");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getById = async (id) =>{

   const AllPokemons = await getAllPokemons();

   const Pokemon = AllPokemons.find((i)=> i.id.toString() === id);
   return Pokemon;


 };

module.exports = {getById};