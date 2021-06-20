const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Galerie extends Model { };


Galerie.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  tableName: "galerie"
});


module.exports = Galerie;