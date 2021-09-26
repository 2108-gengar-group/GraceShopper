const router = require('express').Router();
const { reporters } = require('mocha');
const {
  models: { Cart, User, Product, Cart_Product },
} = require('../db');


//CRUD OPERATIONS [ CREATE, RETRIEVE, UPDATE, DELETE ]
//@description     Get all items in cart for the user logged in/passed in
//@router          GET/api/cart/:userId
// https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOrCreate
router.get('/:userId', async (req, res, next) => {
  try {
    const [currentCart, created] = await Cart.findOrCreate({
      include: Product,
      where: {
        orderStatus: 'UNPAID',
        userId: req.params.userId,
      },
    });

    res.send(currentCart);
  } catch (err) {
    next(err);
  }
});

//------------------------------------------------------------------------------------
//@description    Delete the product for the user logged in
//@router         PUT/api/cart/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);
    const [userCart, created] = await Cart.findOrCreate({
      where: {
        orderStatus: 'UNPAID',
        userId: req.params.userId,
      },
    });
    const deleteThisProduct = await Product.findByPk(productId);
    const removedProduct = userCart.removeProduct(deleteThisProduct);
    res.json(removedProduct);
  } catch (err) {
    console.log('There is an err in your delete cart route');
    next(err);
  }
});


//------------------------------------------------------------------------------------
//@description    Add products to cart for the user logged in/passed in
//@router         POST/api/cart/:userId
router.post('/:userId', async (req, res, next) => {
  try {
    let userIdReq = Number(req.params.userId);
    const userCart = await Cart.findOne({
      where: {
        orderStatus: 'UNPAID',
        userId: userIdReq,
      },
    });


    const targetProduct = await Product.findByPk(req.body.productId);
    await userCart.addProduct(targetProduct);

    const cartProducts = await userCart.getProducts();

    const chosenProduct = cartProducts.filter(
      (product) => targetProduct.id === product.id
    )[0];


     const userQuantity = req.body.quantity;
     const currentCartQuantity = chosenProduct.Cart_Product.quantity;
     const updatedQuantity = userQuantity + currentCartQuantity;
     if (updatedQuantity <= 0) {
      await userCart.removeProduct(targetProduct);
    } else {
      await Cart_Product.update(
        { quantity: updatedQuantity },

        {
          where: {
            productId: targetProduct.id,
            cartId: userCart.id,
          },
        }
      );
    }
    res.json({ updatedQuantity });
  } catch (err) {
    next(err);
  }
});

module.exports = router;















