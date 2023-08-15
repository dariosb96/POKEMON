
const { getAllPokemons } = require("../controllers/getAll_controller");

const getPokemonsHandler = async (req, res) => {
   const {name} = req.query;
    try {
        if(name){
            const response = await getAllPokemons(name);
            return res.status(200).json(response);
        }
        const response = await getAllPokemons();
        return res.status(200).json(response);
    }catch(error){
        res.status(400).json({error: error.message });
    }
}

// const getPokemonsHandler = async (req, res) => {
//  const {name} = req.query;
//    try {
//         if(name ){
//             const PokemonByname = await getByName(name);
//             res.status(200).json(PokemonByname);
//         }else {
//             const response = await getAllPokemons
//             res.status(400).json(response);
//         }
//     }catch (error) {
//         res.status(400).json({error: error.message})
//     }
// } 


module.exports = {getPokemonsHandler};
  
