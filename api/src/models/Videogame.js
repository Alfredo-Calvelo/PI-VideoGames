const { DataTypes } = require('sequelize');
const { all } = require('../routes');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    released:{
      type : DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating:{
      type:DataTypes.DECIMAL,
      defaultValue: 2.5
    },
    description:{
      type: DataTypes.STRING
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.TEXT),
      allowNull:false
    },
    DB:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    background_image:{
      type:DataTypes.STRING,
      defaultValue:'https://screencraft.org/wp-content/uploads/2021/08/Write-for-Video-Games-scaled.jpg',

    }
    
  })}
