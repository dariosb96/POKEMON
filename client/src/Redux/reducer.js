import { GET_POKEMON, GET_TYPES, GET_ID_POKEMON, POST_POKEMON, GET_NAME_POKEMON, FILTER_BY_TYPES, FILTER_IF_CREATED, ORDER_BY_NAME, ORDER_BY_ATTACK } from "../Redux/actions";

//estado inicial de la app
const initialState = {
  pokemon: [],
  allPokemons: [],
  types: [],
  detail: []
}

//reducer que maneja los cambios de estado en la app
const rootReducer = (state = initialState, action) => {

  //el reducer ejecuta un action dependiendo de la peticion
  switch (action.type) {
    
   //actualiza el estado con los datos de todos los pokemons
 case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        allPokemons: action.payload
      };

  //actualiza el estado con la creacion de un pokemon
 case POST_POKEMON:
      return {
        ...state,
      };

  //actualiza el estado con los tipos de pokemon 
 case GET_TYPES:
        return {
          ...state,
          types: action.payload
        };
  
   //actualiza el estado con los pokemons filtrados por tipo
 case FILTER_BY_TYPES:{
      const filtered =
      action.payload === "all"
        ? state.allPokemons
        : state.allPokemons.filter((el) =>
          el.types.some((type) => action.payload.includes(type))
        );
        return {
        ...state,
         pokemon: filtered,
         };
        }  

    //actualiza el estado con los pokemons que se crearon en la bd
  case FILTER_IF_CREATED: {
   
      const filtrado = action.payload === "created" ? state.allPokemons.filter(el => typeof el.id !== 'number') : state.allPokemons.filter(el=> typeof el.id === 'number')
      return{
        ...state,
        pokemon: action.payload === "all" ? state.allPokemons : filtrado
      }
  }

  //actualiza el estado ordenando los pokemons por nombre ascendente o descendente
  case ORDER_BY_NAME: {
    let sortedArr = action.payload === "ascPokemon" ?
    state.pokemon.sort(function (a, b){
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
      }) :
      state.pokemon.sort(function (a, b){
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
    })
    return {
      ...state,
      pokemon: sortedArr
    }
  }

  //actualiza el estado con el pokemon buscado por nombre
case GET_NAME_POKEMON:{
    return{
      ...state,
      pokemon: action.payload
    }}

 // //actualiza el estado con el pokemon buscado por id
 case GET_ID_POKEMON:{
      return{
        ...state,
        detail: action.payload
      }}

   //actualiza el estado con ordenando los pokemons por ataque
    case ORDER_BY_ATTACK: {
      let sortedArr = action.payload === "descA" ?
      state.pokemon.sort((a, b) => b.attack - a.attack) :
      state.pokemon.sort((a, b) => a.attack - b.attack);
    return {
      ...state,
      pokemon: sortedArr
    };
   }
   //mantiene el estado en caso de accion no reconocida
    default:
      return { ...state };
  }
};

export default rootReducer;
