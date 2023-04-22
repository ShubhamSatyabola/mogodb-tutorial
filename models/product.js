const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true

  },
  name: {type: Sequelize.STRING,
    allowNull: false

  },
  cost: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
