//this is the access point for all things database related!

const db = require('./db')
const {User, Cart, Product} = require('./models')


//associations
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, {through: 'Product_Cart'});
Cart.belongsToMany(Product, {through: 'Product_Cart'});

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product
  },
}
