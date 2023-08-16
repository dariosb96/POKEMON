const axios = require("axios");
const {Type} = require("../db");

const getAllTypes = async () => {
    // busca los tipos en la bd
    const types = await Type.findAll({ attributes: ["name", "id"] });

    // busca los tipos en la api
    if (types.length === 0) {
        // Realiza una solicitud a la API para obtener los nombres de los tipos
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const typeNames = response.data.results.map((e) => e.name);

        // Crear registros en la base de datos local para cada tipo obtenido
        await Type.bulkCreate(typeNames.map((name) => ({ name })));

        // Retornar los nombres de los tipos
        return typeNames;
    }
    
    // Si hay tipos en la base de datos, retornar sus nombres
    return types.map((type) => type.name);
};

// funcion para crear un nuevo tipo  en la bd
const createType = async (name) => {
        const newType = await Type.create({ name });
        
        return newType;
};


module.exports ={
    getAllTypes, 
    createType
};