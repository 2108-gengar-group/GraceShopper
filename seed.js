/* eslint-disable no-unused-vars */
const { db } = require('./server/db');
const {
  models: { Cart, Product, User, Cart_Product },
} = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });

    //Coffee Product Instances
    const coffee1 = await Product.create({
      name: 'Friday Night Lattes',
      description:
        'Wind down with our 100% certified organic and non-GMO blend of Hondouran beans. This artisan blend hints at honey, caramel, and cocoa.',
<<<<<<< HEAD
      inventoryQuantity: 10,
      price: 25.99,
=======
      quantity: 10,
      price: 2599,
>>>>>>> a2f4b1280827b80f79aabcfaa51acc576d155076
      stars: 4.0,
    });

    const coffee2 = await Product.create({
      name: 'Cult Classic',
      description:
        'Small batch roasted coffee that has a cult following stronger than qAnon. This blend has a strong but clean taste with no trace of bitterness. The organic beans are sourced from rain forests in Columbia, Guatemala and Sumatra.',
<<<<<<< HEAD
      inventoryQuantity: 5,
      price: 29.99,
=======
      quantity: 5,
      price: 2999,
>>>>>>> a2f4b1280827b80f79aabcfaa51acc576d155076
      stars: 4.5,
    });

    const coffee3 = await Product.create({
      name: 'Brewing Trouble',
      description:
        'Feeling like you want some excitement?  Turn to these peaberry coffee beans that offer a tarty blend of acidity and sweetness guaranteed to wake you up and put a mischevious smile on your face.',
<<<<<<< HEAD
      inventoryQuantity: 0,
      price: 27.99,
=======
      quantity: 0,
      price: 2799,
>>>>>>> a2f4b1280827b80f79aabcfaa51acc576d155076
      stars: 4.0,
    });


    //-------------------------------------------------------------------

    //User Instances
    const user1 = await User.create({
      username: 'brandy',
      password: 'apple',
      name: 'Brandy',
      email: 'brandy@gmail.com',
      isAdmin: false,
    });

    const user2 = await User.create({
      username: 'tia',
      password: '1234',
      name: 'Tia',
      email: 't@gmail.com',
      isAdmin: false,
    });

    const user3 = await User.create({
      username: 'sonja',
      password: '1234',
      name: 'Sonja',
      email: 's@gmail.com',
      isAdmin: false,
    });
    const user4 = await User.create({
      username: 'victoria',
      password: '1234',
      name: 'Victoria',
      email: 'v@gmail.com',
      isAdmin: false,
    });
    //-------------------------------------------------------------------

    //Cart Instances
    const cart1 = await Cart.create({
      orderStatus: "UNPAID",
      totalQty: 5,
      totalPrice: 10.0,
    });

    const cart2 = await Cart.create({
      orderStatus: "UNPAID",
      totalQty: 2,
      totalPrice: 5.0,
    });


    const cart3 = await Cart.create({
      orderStatus: "UNPAID",
      totalQty: 3,
      totalPrice: 15.0,
    });

    const cart4 = await Cart.create({
      orderStatus: "UNPAID",
      totalQty: 5,
      totalPrice: 17.0,
    });

  //Note: I removed all set products to cart because I wanted to check my backend add to cart routes were working via Postman instead. However, for testing purposes, feel free to add await and set your products here*.

  await user1.addCart(cart1);
  await user2.addCart(cart2);

  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success - seedJS!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}



//Notes from Seeding DB
 //Setting User to Cart
//  await user1.addCart(cart1);
//  await user2.addCart(cart2);
//  await user4.addCart(cart4)

 //Setting Products to Cart
 //---> 3 Products in Cart1, associated to user1 (Brandy)
//  await coffee2.addCart(cart1);
//  const updatedQuantity = await Cart_Product.update(
//    { quantity: 2 },
//    {
//      where: {
//        productId: coffee2.id,
//        cartId: cart1.id,
//      },
//    }
//  );
 // await coffee1.addCart(cart1);
 // --> 1 Product in Cart2, associated with User 2 (Tia)
 // await coffee3.addCart(cart2);
 // await coffee1.addCart(cart2);

 //--> Adding Products to Cart?
 // await cart2.addProduct(coffee1

 //cart4 check
//  await coffee2.addCart(cart4);
//  await coffee1.addCart(cart4);
//  await coffee3.addCart(cart4);
