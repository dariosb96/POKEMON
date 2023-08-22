export default function Validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  }else if(input.name.length > 14){
    errors.name ="El nombre es muy largo";
  }

  if (input.life < 20 || input.life > 100) {
    errors.life = "La vida debe estar entre 20 y 100";
  }

  if (input.attack < 20 || input.attack > 100) {
    errors.attack = "El Ataque debe estar entre 20 y 100";
  }

  if (input.defense < 20 || input.defense > 100) {
    errors.defense = "La Defensa debe estar entre 20 y 100";
  }

  if (input.speed < 20 || input.speed > 100) {
    errors.speed = "La Velocidad debe estar entre 20 y 100";
  }

  if (input.height < 20 || input.height > 950) {
    errors.height = "La Altura debe estar entre 20 y 100";
  }

  if (input.weight < 20 || input.weight > 950) {
    errors.weight = "El Peso debe estar entre 20 y 950";
  }

  return errors;
}
