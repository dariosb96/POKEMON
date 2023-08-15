const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true, 
      defaultValue : DataTypes.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      image: {
      type: DataTypes.STRING,
      isUrl: true,
    },
      life: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      attack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      defense:{
      type: DataTypes.STRING,
      allowNull: true,
    },
      speed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps: false}
  );
};

