import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES"
export const FILTER_IF_CREATED = "FILTER_IF_CREATED"
export const ORDER_BY_NAME = "ORDER_BY_NAME" 
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"
export const GET_NAME_POKEMON = "GET_NAME_POKEMON"
export const GET_TYPES = "GET_TYPES"
export const POST_POKEMON = "POST_POKEMON"
export const GET_ID_POKEMON = "GET_ID_POKEMON"


//action para obtener los datos de todos los pokemons
export function getPokemon(){
    return async function(dispatch){
        //hacemos la peticion a la ruta del back que obtiene todos los pokemons
        const json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMON,
            payload: json.data
        })
    }
}

//action para obtener todos los tipos de pokemon
export function getTypes() {
    return async function(dispatch) {
       //hacemos la peticion get a la ruta del back que nos da los tipos  
      const info = await axios.get("http://localhost:3001/types");
      const types = info.data.map(name => ({ id: name, name })); 
      return dispatch({
        type: GET_TYPES,
        payload: types
      });
    };
  }
  
//action para crear un nuevo pokemon
export function postPokemon(payload){
    return async function(dispatch){
        //hacemos un post a la ruta correspondiente del back
        const response = await axios.post("http://localhost:3001/pokemons",payload);

        //despachar una accion que devuelve el pokemon creado
        return dispatch({
            type: POST_POKEMON,
            payload: response.data
        })
} 
 }

 //action para filtrar por tipo de pokemon
export function filterByType(payload) {
    console.log(payload)
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

//action para mostrar solo los pokemons creados
export function filterIfCreated(payload){
    return{
        type: FILTER_IF_CREATED,
        payload
    } 
}

//action para ordenar por orden alfabetico
export function orderByname(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

//action para ordenar por ataque
export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }  
}

//action para obtener un pokemon por su nombre
export function getNamePokemon(name){
return async function (dispatch){
    try {
        let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        return dispatch({
            type: GET_NAME_POKEMON,
            payload: json.data
        })
    } catch(error){
       console.log(error) 
    }
}

}

//action para obtener un pokemon por id
export function getIdPokemon(id){
    
    return async function (dispatch){
        try {
            //se hace la peticion get a la ruta del back que obtiene un pokemon mediante su id
            let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            console.log(json.data);
            return dispatch({
                type: GET_ID_POKEMON,
                payload: json.data
            })
        } catch(error){
           console.log(error) 
        }
    }
    
    }



