const router = require('express').Router();
const { reporters } = require('mocha');
const {
  models: { Cart, User, Product, Cart_Product },
} = require('../db');

//Notes

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
    console.log(currentCart);
    res.json(currentCart);
  } catch (err) {
    next(err);
  }
});

//This handles both ADD TO CART, DELETE FROM CART (update requests)
router.put('/:userId', async (req, res, next) => {
  try {
<<<<<<< HEAD
    const [userCart, created] = await Cart.findOrCreate({
=======
    const productId = Number(req.body.productId);
    const userCart = await Cart.findOne({
>>>>>>> a2f4b1280827b80f79aabcfaa51acc576d155076
      where: {
        orderStatus: 'UNPAID',
        userId: req.params.userId,
      },
    });
<<<<<<< HEAD

    const targetProduct = await Product.findByPk(req.body.productId);

    await userCart.addProduct(targetProduct); //TODO

    const cartProducts = await userCart.getProducts();
    const chosenProduct = cartProducts.filter(
      (product) => targetProduct.id === product.id
    )[0];
    const newQuantity = req.body.quantity;
    const currentQuantity = chosenProduct.Cart_Product.quantity; //6

    const updatedQuantity = newQuantity + currentQuantity;

    if (updatedQuantity <= 0) {
      await userCart.removeProduct(targetProduct);
    } else {
      await Cart_Product.update(
        { quantity: newQuantity + currentQuantity },

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
=======
    const deleteThisProduct = await Product.findByPk(productId);
    const removedProduct = userCart.removeProduct(deleteThisProduct);
    res.json(removedProduct);
  } catch (err) {
    console.log('There is an err in your delete cart route');
    next(err);
  }
});

//@description    Add products to cart for the user logged in/passed in
//@router         POST/api/cart/:userId
//SECURITY
router.post('/:userId', async (req, res, next) => {
try {
  let userIdReq = Number(req.params.userId);
  console.log('body', req.body)
  const newProduct = await Product.findByPk(req.body.id);
  console.log('new product', newProduct)

  console.log('body', req.body)
  const userCart = await Cart.findOne({
    where: {
      orderStatus: 'UNPAID',
      userId: userIdReq,
    },
  });

  const addedItem = await userCart.addProduct(newProduct);

  // set or increase qty
  // querying through table -- need 2 keys -- many to many*
  // if the product exists in their cart -- update, if not findOrCreate
  const updatedInfo = await Cart_Product.update(
    { quantityItem: req.body.qtyBags,
     pricePerItem: req.body.price },
    {
      where: {
        productId: newProduct.id,
        cartId: userCart.id,
      },
    }
  );
  res.json(updatedInfo);

  }
  catch (err) {
>>>>>>> a2f4b1280827b80f79aabcfaa51acc576d155076
    next(err);
  }
});





module.exports = router;

///-----------------------------------------------------------------
//PUT ROUTE



// const newProduct = await Product.findByPk(req.body.productId);
// const userCart = await Cart.findOne({
//   where: {
//     orderStatus: 'UNPAID',
//     userId: req.params.userId,
//   },
// });
// const productExists = await userCart.hasProduct(newProduct)

// console.log("HAS PRODUCT--->", productExists)
// res.json(userCart)


//Some tips
//Get state
//initial state to local storage
//JSON.stringify
//incrementig decrementing the field -- await the fields update
//creating model methods - find cart order
