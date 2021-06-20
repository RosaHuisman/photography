const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Photos extends Model {};


Photos.init({
  name: DataTypes.STRING,
  //fieldname: DataTypes.STRING,
  //originalname: DataTypes.STRING,
  //encoding: DataTypes.STRING,
  //mimeptype: DataTypes.STRING,
  //destination: DataTypes.STRING,
  //filename: DataTypes.STRING,
  //path: DataTypes.STRING,
  //size: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "photos"
});


module.exports = Photos;