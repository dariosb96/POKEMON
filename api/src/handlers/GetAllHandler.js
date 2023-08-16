
const { finalPokemons, getAllPokemons } = require("../controllers/getAll_controller");

//Creacion del handler para obtener los pokemons
const getPokemonsHandler = async (req, res) => {
    const {name} = req.query
    try {
        //si la peticion incluye un nombre se invocara al controller con el valor del nombre
        if(name){
            const pokeByName = await getAllPokemons(name)
            return res.status(200).json(pokeByName)
        }
        //si la peticion no incluye nombre se traeran todos los pokemons 
        else{
            const allPokemon = await getAllPokemons()
            return res.status(200).json(allPokemon)
        }
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
} 

module.exports = {getPokemonsHandler};
  
