const {createPokemon} = require("../controllers/create_controller")

//handler para crear un pokemon
const create_Handler = async (req, res)=> {
   
    try {
     //invoca al controler de creacion mandandole valores por body   
     const response = await createPokemon(req.body);
     res.status(200).json(response);
    }catch (error){
        res.status(400).json({error: error.message});
    };
}

module.exports = { create_Handler};
