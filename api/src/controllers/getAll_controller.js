const {Pokemon, Type} = require("../db")
const axios = require("axios");


const getInfoApi = async ()=>{
   const URL = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
   const apiData = URL.data.results.map(
      async(e) => {
         const pokemonData  = await axios.get(e.url);
         return {
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            img: pokemonData.data.sprites.other.dream_world.front_default,
            life: pokemonData.data.stats[0].base_stat,
            attack: pokemonData.data.stats[1].base_stat,
            defense:pokemonData.data.stats[2].base_stat,
            speed:pokemonData.data.stats[5].base_stat,
            height: pokemonData.data.height,
            weight: pokemonData.data.weight,
            types: pokemonData.data.types.map((type)=> type.type.name),
         }
      });
       return Promise.all(apiData);
}


const getInfoDB = async () => {
   return await Pokemon.findAll({
     include: {
       model: Type,
       attributes: ["name"],
       through: {
         attributes: [],
       },
     },
   });
 };

const getAllPokemons = async (name) => {
    const infoApi = await getInfoApi();
    const infoDB = await getInfoDB();
    const finalInfo = [...infoApi, ...infoDB];

    if(name){
      const finalPokemon = finalInfo.filter((pokemon)=>{
         if(pokemon.name.toLowerCase().includes(name.toLowerCase)){
            return pokemon;
         }
      });
         if(finalPokemon.length <= 0){
            throw new Error("Error: No hay pokemones");
         }else {
            return finalPokemon;
         }
    } else {
      return finalInfo;
    }
   
}
// getInfoDB

module.exports = { getInfoApi, getAllPokemons, getInfoDB  }