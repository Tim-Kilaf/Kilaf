'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Roles)
      Users.hasMany(models.Items)
      Users.hasMany(models.Biddings)
    }
  };
  Users.init({
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name Must Be Filled'
        }
      }
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email Must Be Filled'
        },
        isEmail:{
          msg: 'Please Insert Email Format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password Must Be Filled'
        },
        len:{
          args: [6],
          msg: 'Password Minimum 6 Characters'
        }
      }
    },
    RoleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
    user.RoleId = 2
  });
  return Users;
};