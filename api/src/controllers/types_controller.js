const axios = require("axios");
const {Type} = require("../db");

const getAllTypes = async () => { 
    const types = await Type.findAll({attributes: ["name", "id"] });
    if(types.length === 0){
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const typeNames = response.data.results.map((e) => e.name);

        await Type.bulkCreate(typeNames.map((name)=>({name})));

        return typeNames;
    }
        return types.map((type)=> type.name);

};

const createType = async (name) =>{
    const newType = await Type.create({name}); 
}

module.exports ={
    getAllTypes, 
    createType
};