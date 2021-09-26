const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  description: {
    type: Sequelize.TEXT
  },
  price:  {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  //this was changed* - maybe better to call this "inventory"?
  inventoryQuantity: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://post.healthline.com/wp-content/uploads/2020/08/safe-to-eat-coffee-beans-732x549-thumbnail-732x549.jpg"
  },
  stars: {
    type: Sequelize.FLOAT
  },
  // qtyBags: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  // },
})

module.exports = Product;
