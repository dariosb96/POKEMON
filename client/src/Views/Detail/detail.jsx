import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Pokemon from "../../Imagenes/Pokemoncreado.png";
import style from "./detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  //obtiene el id por parametro de ruta
  const { id } = props.match.params;


  //estado local que controla la carga de los detalles del pokemon
  const [state, setState] = useState({
    loading: true,
  });


  //efecto de React que se ejecuta cuando el componente se monta
  useEffect(() => {
    dispatch(getIdPokemon(id)); 


   //simula una carga de 2 segundos antes de mostrar los detalles del pokemon 
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, loading: false }));
    }, 2000);
  }, [dispatch, id, state]);

  //obtiene los detalles del pokemon del estado global
  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      <div >
      <Link to="/home">
        <button className={style.detaillink}>Volver</button>
      </Link>
      </div>
      <div className={style.detail }>
        {state.loading ? (
          <p className={style.detailp }>Loading...</p>
        ) : myPokemon ? (
          <div>
            <h1 className={style.detailh1 }>{myPokemon.name}</h1>
            <div detailimg >
            {myPokemon.image ? (
              <img src={myPokemon.image} alt="" />
            ) : (
              <img src={Pokemon} alt="Imagen por defecto" />
            )}</div>
            <div className={style.detailp }>
            <p>Life: {myPokemon.life}</p>
            <p>Attack: {myPokemon.attack}</p>
            <p>Defense: {myPokemon.defense}</p>
            <p>Speed: {myPokemon.speed}</p>
            <p>Height: {myPokemon.height}</p>
            <p>Weight: {myPokemon.weight}</p>
            <div className={style.detailp }>
              <p>Types:</p>
              {myPokemon.types?.map((t, index) => (
                <span key={index}>
                  {t.name ? (
                    <Link to={`/home/${id}`}>{t.name}</Link>
                  ) : (
                    <span>{t}</span>
                  )}
                  {index < myPokemon.types.length - 1 && <span> - </span>}
                </span>
              ))}</div>
            </div>
          </div>
        ) : (
          <p className={style.detailp }>Pokemon no encontrado</p>
        )}
      </div>
    </div>
  );
}
