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












//------------------------------------------------------------------------------------
//@description    Updating quantity* for each product in a user's cart
//@router         PUT/api/cart/:userId/update
// router.put('/:userId/quantity', async (req, res, next) => {
//   try {
//     const userCart = await Cart.findOne({
//       where: {
//         orderStatus: 'UNPAID',
//         userId: req.params.userId,
//       },
//     });

//     //Find the target product and if it is the chosen product, see if that matches
//     //with what the user selected.
//     const targetProduct = await Product.findByPk(req.body.productId);
//     const cartProducts = await userCart.getProducts();
//     const chosenProduct = cartProducts.filter(
//       (product) => targetProduct.id === product.id
//     )[0];

//     //Quantity
//     //the quantity for the item user wants to add:
//     const userQuantity = req.body.quantity;

//     //The quantity of items in the user's cart
//     const currentCartQuantity = chosenProduct.Cart_Product.quantity;
//     const updatedQuantity = userQuantity + currentCartQuantity;

//     //Feel free to comment out these console logs but it's useful to see them
//     // so you can gain a better understanding of the code / what's going on.
//     //This will print once you've made a PUT request following that URI in postman
//     console.log('THE CHOSEN PRODUCT ID--->', chosenProduct.id);
//     console.log('THE NEW QUANTITY---->', userQuantity);
//     console.log('THE CURRENT QUANTITY--->', currentCartQuantity);
//     console.log('THE UPDATED QUANTITY FOR PRODUCT--->', updatedQuantity);

//     //If the quantity for an item is less than zero, remove the product from cart
//     if (updatedQuantity <= 0) {
//       await userCart.removeProduct(targetProduct);
//     } else {
//       //else update the quantity row for each instance in the Cart_Product Model
//       await Cart_Product.update(
//         { quantity: updatedQuantity },

//         {
//           where: {
//             productId: targetProduct.id,
//             cartId: userCart.id,
//           },
//         }
//       );
//     }
//     //Check on Postman to see if the correct math calculated; example: ordered 3 more of Cult Classics (when I have 5 Cult Classics already in my cart) -- new total is 8 for Cult Classics
//     res.json({ updatedQuantity });
//   } catch (err) {
//     next(err);
//   }
// });







//------------------------------------------------------------------------------------

//MISCELLANEOUS --- THIS CODE WORKS TOO, just more difficult to render on front-end
//This handles both ADD TO CART, DELETE FROM CART (update requests)


// PUT /api/cart/:userId
// router.put('/:userId', async (req, res, next) => {
//   try {
//     const [userCart, created] = await Cart.findOrCreate({
//       where: {
//         orderStatus: 'UNPAID',
//         userId: req.params.userId,
//       },
//     });

//     await userCart.addProduct(targetProduct); //TODO

//     const cartProducts = await userCart.getProducts();
//     const chosenProduct = cartProducts.filter(
//       (product) => targetProduct.id === product.id
//     )[0];
//     const newQuantity = req.body.quantity;
//     const currentQuantity = chosenProduct.Cart_Product.quantity; //6

//     const updatedQuantity = newQuantity + currentQuantity;

//     if (updatedQuantity <= 0) {
//       await userCart.removeProduct(targetProduct);
//     } else {
//       await Cart_Product.update(
//         { quantity: newQuantity + currentQuantity },

//         {
//           where: {
//             productId: targetProduct.id,
//             cartId: userCart.id,
//           },
//         }
//       );
//     }

//     res.json({ updatedQuantity });
//   } catch (err) {
//     next(err);
//   }
// });



