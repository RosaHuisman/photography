const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Photos extends Model {};


Photos.init({
  name: DataTypes.STRING,
}, {
  sequelize,
  tableName: "photos"
});


module.exports = Photos;