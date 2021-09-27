/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteProduct } from "../store/cartReducer";
import { Link } from "react-router-dom"

const Cart = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.thisCart);

    //dispatch
    const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchCart(user.id));
    }
  }, [user]);

  const products = cart.products || [];

  //Delete Button
  const deleteItemHandler = (event) => {
    console.log('The delete button was clicked!');
    console.log(event.target.name)
    dispatch(deleteProduct(user.id, event.target.name))
  }


  //Cart Total Derivative Variables
  const cart_products = products.map((product) => {
    return product.Cart_Product
  })
  console.log("the cartproducts--->", cart_products)
  // const productQuantity = cart_product.map((product) => {
  //   return product.quantity
  // })
  // const productPrice = products.map((product) => {
  //   return product.price
  // })
  // const subtotal = productPrice.map((price, index) => {
  //     const pricePerItem = productQuantity[index] * price;
  //     return pricePerItem
  // })
  // const total = subtotal.reduce((accumulator, value) => {
  //   const sum = accumulator + value;
  //   return sum;
  // }, 0)



  return (
    <>
    <Link to="/products"><strong>Continue Shopping</strong></Link>
      <h1 id="cart-title">Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-container-items">
          {products.map((product) => {
            const cartProduct = product.Cart_Product || [];
            return (
              <div id="cart-item" key={product.id}>
                <span>
                  <img
                    src={product.imageUrl}
                    alt="product-photo"
                    id="product-photo"
                  />
                </span>

                <span>{product.name}</span>

                <span> | {product.Cart_Product ? product.Cart_Product.quantity : 0} bag(s) |</span>

                <span> ${ product.price / 100 } </span>

                <span>
                  <button onClick = {deleteItemHandler} name = {product.id}>Remove Item</button>
                </span>
              </div>
            );
          })}
        </div>
        <div className="cart-totals">
          <span id="cart-total-items">
            {products.length === 0 ? <h3>Your Cart is Empty...</h3> : <h3>You have {products.length} items in your cart.</h3>}
          </span>
          <span id="cart-subtotal"><h2>Subtotal:</h2></span>

          <button>Checkout</button>
          <button>Empty Cart - NA</button>
        </div>
      </div>
    </>
  );
};

/**
 * CONTAINER
 */

export default Cart;
