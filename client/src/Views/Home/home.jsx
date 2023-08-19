import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/card"
import Pagination from "../../Components/Pagination/pagination";
import { filterByType, filterIfCreated, orderByname, orderByAttack} from "../../Redux/actions";
import NavBar from "../../Components/NavBar/navbar";
import style from "./home.module.css";



export default function Home() {
  const dispatch = useDispatch();

  //obtiene todos los pokemons mediante el estado de Redux.
  const allPokemon = useSelector((state) => state.pokemon);

  //variables de estado para ordenamiento y paginacion
  const[orden, setOrden] = useState("")
  const[attack, setAttack] = useState("")
  const [currentPage, setcurrentPage] = useState(1)
  const[pokemonPerPage, setpokemonPerPage] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage
  const currentPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)


  //funcion para cambiar la pagina actual en la paginacion
  const paginado = (pageNumber) => {
    setcurrentPage(pageNumber);
  };


//// Despachar la acción "getPokemon" cuando el componente se monta o cuando cambia de pagina
 useEffect(() => {
  dispatch(getPokemon());
}, [dispatch, currentPage, pokemonPerPage]);


  // Función para filtrar Pokémon por tipo
function handleFilterType(e) {
  e.preventDefault();
  dispatch(filterByType(e.target.value));
  setcurrentPage(1);
}


//funcion para filtrar pokemones creados
function handleFilterCreated(e) {
  e.preventDefault();
  dispatch(filterIfCreated(e.target.value));
  setcurrentPage(1);
}


// función para ordenar Pokémon por nombre
function handleSort (e){
  e.preventDefault();
  dispatch(orderByname(e.target.value))
  setcurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
};


//función para ordenar Pokémon por ataque
function handleAttack(e) {
  e.preventDefault();
  dispatch(orderByAttack(e.target.value));
  setAttack(e.target.value);
  setcurrentPage(1);
}



  return (
    <body>

        <div  className={style.container}>
        <NavBar/>
        <div className={style.filters}>
           <div >
            <span>Tipos</span>
            <select onChange={e => handleFilterType(e)}>
                        <option value='all'>All</option>
                        <option value='fighting'>Fighting</option>
                        <option value='grass'>Grass</option>
                        <option value='poison'>Poison</option>
                        <option value='fire'>Fire</option>
                        <option value='flying'>Flying</option>
                        <option value='water'>Water</option>
                        <option value='bug'>Bug</option>
                        <option value='normal'>Normal</option>
                        <option value='electric'>Electric</option>
                        <option value='ground'>Ground</option>
                        <option value='fairy'>Fairy</option>
                        <option value='rock'>Rock</option>
                        <option value='ghost'>Ghost</option>
                        <option value='steel'>Steel</option>
                        <option value='psychic'>Psychic</option>
                        <option value='ice'>Ice</option>
                        <option value='dragon'>Dragon</option>
                        <option value='stedarkel'>Stedarkel</option>
                        <option value='shadow'>Shadow</option>
                        <option value='unknown'>Unknown</option>
                    </select>
          </div>
      <div>
        <span>Orden by Pokemons</span>
        <select onChange={e => handleSort(e)}>
          <option value="OrdenBy">Orden by Pokemons</option>
          <option value="ascPokemon">[A-Z]</option>
          <option value="descPokemon">[Z-A]</option>
        </select>
      </div>
      <div>
        <span> Existentes o creados</span>
        <select onChange={e => handleFilterCreated(e)}>
        <option value='all'>Todos</option>
        <option value='created'>Creados</option>
        <option value='api'>Existentes</option>
        </select>
      </div>
      <div>
        <span>Orden by Ataque</span>
        <select  onChange={e => handleAttack(e)}>
          <option value="attack">Orden By Ataque</option>
          <option value="ascA">Menor Ataque</option>
          <option value="descA">Mayor Ataque</option>
        </select>
        </div> 
        
      </div> 
      <div div className={style.card}>
      {currentPokemon?.map((props) =>( 
       
         
        <Link to={`/detail/${props.id}`} key={props.id}>
          <Card name={props.name} img={props.img } types={props.types} />
       </Link>

  ))}
  <div></div></div>
  <Pagination
        pokemonPerPage={pokemonPerPage}
        allPokemon={allPokemon.length}
        paginado={paginado}
        />
        </div>
  <br />
  <br />
    </body>
) }