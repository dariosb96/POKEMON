import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNamePokemon, getPokemon } from "../../Redux/actions";
import style from "./navBar.module.css";

//componente de barra de navegacion
const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //funcion para manejar cambios en la entrada de busqueda
  const handleSearchInputChange = (event) => {
    setName(event.target.value);
  };


  //funcion para manejar el cambio de estado de click en boton de busqueda
  const handleSearchButtonClick = () => {
    dispatch(getNamePokemon(name));
  };


//funcion para manejar el click  de  buscar todos los  pokemons 
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemon());
  }

  return (
    <div className={style.navbar}>
      <div>
      <p className={style.pnav}>Mundo Pokemon</p>
      </div>
      
      <div className={style.containernav}>
        <ul>
          <li className={style.linknavli}>
            <Link to="/Create">Crear Pokemon</Link>
          </li>
        </ul>
        <div>
          <input
           className={style.navinput} 
            type="text"
            value={name}
            onChange={handleSearchInputChange}
            placeholder="Busca tu Pokemon..."
          />
          <button className={style.buttonnav} onClick={handleSearchButtonClick}>
            <span>Buscar</span>
          </button>
        </div>
        <ul>
          <li className={style.linknavli2}>
            <Link to="/home"  onClick={e=> {handleClick(e)}}>Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
