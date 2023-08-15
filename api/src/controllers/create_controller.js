const {Pokemon, Type}= require("../db");

const createPokemon = async (PokemonData) => {

const {name, image, life, attack, defense, speed, height, weight, types} = PokemonData;

 const newPokemon =  await Pokemon.create({
    name, image, life, attack, defense, speed, height, weight});

if(Array.isArray(types) && types.length > 0){
    const TypesRelation = await Promise.all(types.map((typeName)=> TypesRelation.findOrCreate({where: {name: typeName}}))
    );
    await newPokemon.addType(TypesRelation.map((type) => type[0]))

}
    return newPokemon;

};
module.exports = {createPokemon};