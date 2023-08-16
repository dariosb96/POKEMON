const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Función para obtener información de la API externa
const getInfoApi = async () => {
  // Realizar solicitud a la API para obtener la lista de Pokémon
  const URL = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
  
  // Mapear y obtener información detallada de cada Pokémon
  const apiData = await Promise.all(
    URL.data.results.map(async (e) => {
      // Realizar solicitud para obtener datos específicos del Pokémon
      const pokemonData = await axios.get(e.url);
      
      // Estructurar y retornar los datos del Pokémon
      return {
        id: pokemonData.data.id,
        name: pokemonData.data.name,
        img: pokemonData.data.sprites.other.dream_world.front_default,
        life: pokemonData.data.stats[0].base_stat,
        attack: pokemonData.data.stats[1].base_stat,
        defense: pokemonData.data.stats[2].base_stat,
        speed: pokemonData.data.stats[5].base_stat,
        height: pokemonData.data.height,
        weight: pokemonData.data.weight,
        types: pokemonData.data.types.map((type) => type.type.name),
      };
    })
  );
  return apiData;
};

// Función para obtener información de la base de datos local
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

// Función para obtener información de todos los Pokémon
const getAllPokemons = async (name) => {
  const infoApi = await getInfoApi();
  const infoDB = await getInfoDB();
  const finalInfo = [...infoApi, ...infoDB];

  if (name) {
    // Filtrar los Pokémon por nombre si se proporciona un nombre
    const finalPokemon = finalInfo.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );

    if (finalPokemon.length <= 0) {
      throw new Error("Error: No hay pokemones");
    } else {
      return finalPokemon;
    }
  } else {
    return finalInfo;
  }
};

module.exports = { getInfoApi, getAllPokemons, getInfoDB };