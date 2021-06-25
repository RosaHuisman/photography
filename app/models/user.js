const {Model, DataTypes} = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../database');

class User extends Model {

  get fullname() {
    return this.firstname + ' ' + this.lastname;
  };

};

User.init({
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  role: DataTypes.STRING,
  status: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "user"
});


module.exports = User;