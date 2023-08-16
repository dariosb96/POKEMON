
const {getAllTypes,createType} = require("../controllers/types_controller");
const{Type} = require("../db");

//handler para obtener los tipos de pokemons
const GetTypes = async (req, res) => {
try{
    //invoca al controler que obtiene todos los tipos
    const type = await getAllTypes();
    res.json(type);
}catch(error ) {
    res.status(400).json({error:error-message});
}
}

//handler para crear un nuevo tipo
const PostTypeHandler = async (req, res) => {
    try{
        //invoca al controler que crea un nuevo tipo
        const newtype = await createType(req.body);
        res.json(newtype);
    }catch(error ) {
        res.status(400).send("no se puede crear un tipo nuevo");
    }
    }
    

module.exports = { GetTypes, PostTypeHandler} ;