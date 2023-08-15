
const {getAllTypes,createType} = require("../controllers/types_controller");
const{Type} = require("../db");

const GetTypes = async (req, res) => {
try{
    const type = await getAllTypes();
    res.json(type);
}catch(error ) {
    res.status(400).json({error:error-message});
}
}

const PostTypeHandler = async (req, res) => {
    try{
        const newtype = await createType(req.body);
        res.json(newtype);
    }catch(error ) {
        res.status(400).json({error:error-message});
    }
    }
    

module.exports = { GetTypes, PostTypeHandler} ;