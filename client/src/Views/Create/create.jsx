import React, {useState,useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postPokemon, getTypes} from "../../Redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Validate from "../../Components/Validate/Validate"
import style from "./create.module.css";



//maneja la creacion de un nuevo Pokemon utilizando redux para gestionar el estado de a app
export default function Create(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors,setErrors] = useState({});
   
    //estado local para manejar los valores del formulario
    const [input, setInput] = useState({
    name: "",
    image: "",
    life: 0,
    attack: 0,
     defense: 0,
     height: 0,
     weight: 0,
    speed: 0,
    types: []
    })

    //se ejecuta cuando el componente se monta
    useEffect(()=>{
        dispatch(getTypes());
    }, [dispatch]);


// se encarga de actualizar el estado del formulario a medida que el usuario ingresa información en los campos.
function handleChange(e){
    const { name, value } = e.target;
    
setInput({
    ...input,
    [name] : value
})

//valida que los datos esten correctamente ingresados
setErrors(Validate({
    ...input,
    [name]: value,
  }));
}


//permite agregar tipos al nuevo Pokémon seleccionándolos desde un menú desplegable.
function handleSelect(e) {
    const selectedType = e.target.value;
    if (!input.types.includes(selectedType)) {
      setInput({
        ...input,
        types: [...input.types, selectedType]
      });
    }
  }


//se activa un boton de creacion cuando el formulario esta totalmente creado  
function handleSubmit(e) {
    e.preventDefault();
  
    if (isFormComplete()) {
      dispatch(postPokemon(input))
        .then(() => {
          alert("Pokemon Creado");
          setInput({
            name: "",
            image: "",
            life: "",
            attack: 0,
            defense: 0,
            height: 0,
            weight: 0,
            speed: 0,
            types: []
          });
          history.push("/home");
        })
        .catch((error) => {
          console.error("Error al crear el Pokémon:", error);
        });
    }
  }


  // funcion encargada de validar que el form este lleno 
  function isFormComplete() {
    const { name, life, attack, defense, height, weight, speed } = input;
    return (
      name !== "" &&
      life >= 1 &&
      life <= 100 &&
      attack >= 20 &&
      attack <= 100 &&
      defense >= 20 &&
      defense <= 100 &&
      height >= 20 &&
      height <= 100 &&
      weight >= 20 &&
      weight <= 100 &&
      speed >= 20 &&
      speed <= 950
    );
  }


// se encarga de borrar algun tipo de pokemon no deseado
function handleDelete(el){
    setInput({
        ...input,
        types: input.types.filter(typ => typ !== el)
    })
}

return(
    <div>
       
        <Link to= "/home"><button className={style.buttonc}>Volver</button></Link>
        <div className={style.contc}>
        <h1 className={style.ch1}>Crea tu Pokemon</h1>
        <form className={style.formc} onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label>Nombre:</label>
                <input type="text"
                value={input.name}
                name= "name"
                onChange={(e)=>handleChange(e)} />
                {errors.name && (
                    <p>{errors.name}</p>
                )}
            </div>
            <div>
                <label>Imagen:</label>
                <input type="text"
                value={input.image}
                name= "image"
                onChange={(e)=>handleChange(e)} />
                
            </div>
            <div>
                <label>Vida:</label>
                <input type="number"
                value={input.life} 
                name= "life"
                min={1}
                max={100}
                onChange={(e)=>handleChange(e)} />
               {errors.life && (
                    <p>{errors.life}</p>
                )}
            </div>
            <div>
                <label>Ataque:</label>
                <input type="number"
                value={input.attack} 
                 name= "attack"
                 min={20}
                 max={100}
                onChange={(e)=>handleChange(e)} />
              {errors.attack && (
                    <p>{errors.attack}</p>
                )}
            </div>
            <div>
                <label>Defensa:</label>
                <input type="number"
                value={input.defense}
                name= "defense"
                min={20}
                max={100}
                onChange={(e)=>handleChange(e)} />
                {errors.defense && (
                    <p>{errors.defense}</p>
                )}
            </div>
            <div>
                <label>Velocidad:</label>
                <input type="number"
                value={input.speed}
                name= "speed"
                min={20}
                max={100}
                onChange={(e)=>handleChange(e)} />
                {errors.speed && (
                    <p>{errors.speed}</p>
                )}
            </div>
            <div>
                <label>Altura:</label>
                <input type="number"
                value={input.height}
                name= "height"
                min={20}
                max={100}
                onChange={(e)=>handleChange(e)} />
                {errors.height && (
                    <p>{errors.height}</p>
                )}
            </div>
            <div>
                <label>Peso:</label>
                <input type="number"
                value={input.weight}
                name= "weight"
                min={20}
                max={950}
                onChange={(e)=>handleChange(e)} />
                {errors.weight && (
                    <p>{errors.weight}</p>
                )}
            </div>
            <div className={style.types}>
            <h4>Types:</h4>
            <select onChange={(e) => handleSelect(e)}>
  {types.map((typ) => (
    <option
      value={typ.id}
      key={typ.id}
      disabled={input.types.includes(typ.id)}
    >
      {typ.name}
    </option>
  ))}
</select></div>
<br />
<br />
{isFormComplete() && (
          <button className={style.buttonc} type="submit">CREAR POKEMON</button>
        )}

        </form>
{input.types.map(el =>
    <div>
  <p className={style.px}>{el}</p>
        <button className={style.dx} onClick={()=> handleDelete(el)}>X</button>
    </div>
     )}

    </div></div>
)

}