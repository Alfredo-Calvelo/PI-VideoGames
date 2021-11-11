const { DataTypes } = require('sequelize');
const { all } = require('../routes');


module.exports = (sequelize) => {

  sequelize.define('genres', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
    },
  })}