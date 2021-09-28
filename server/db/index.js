//this is the access point for all things database related!

const db = require('./db')
const User= require("./models/User")
const Product= require("./models/Product")
const { Cart, Cart_Product } = require("./models/Cart")


//associations -- These are the only associations that worked
//when testing the data and filling the models with it
//User can have many carts --- but only one can be "active" per time [meaning, payment status needs to be true --> the order is closed before they can open a new cart/order again]

User.hasMany(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: Cart_Product });
Cart.belongsToMany(Product, { through: Cart_Product });

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
    Cart_Product
  },
};
