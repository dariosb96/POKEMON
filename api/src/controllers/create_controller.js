const {Pokemon, Type}= require("../db");

// Función para crear un nuevo Pokémon en la base de datos
const createPokemon = async (PokemonData) => {

    // Recibe los datos del pokemon por parametros
    const { name, image, life, attack, defense, speed, height, weight, types } = PokemonData;
  
    // Crear un nuevo Pokémon en la base de datos
    const newPokemon = await Pokemon.create({
      name, image, life, attack, defense, speed, height, weight
    });
  
    // Si se proporcionan tipos, relacionarlos con el nuevo Pokémon
    if (Array.isArray(types) && types.length > 0) {
      const TypesRelation = await Promise.all(types.map((typeName) => Type.findOrCreate({ where: { name: typeName } }))
      );
      await newPokemon.addType(TypesRelation.map((type) => type[0]))
    }
  
    // Retornar el nuevo Pokémon creado
    return newPokemon;
  };
module.exports = {createPokemon};