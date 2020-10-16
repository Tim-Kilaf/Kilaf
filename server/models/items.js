'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Items.init({
    UserId: DataTypes.INTEGER,
    HighestBiddingId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    condition: DataTypes.STRING,
    description: DataTypes.STRING,
    starting_price: DataTypes.INTEGER,
    current_price: DataTypes.INTEGER,
    buyout_price: DataTypes.INTEGER,
    bid_increment: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    buyout_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};