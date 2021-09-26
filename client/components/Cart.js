/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteProduct } from "../store/cartReducer";

/**
 *Production Note - once we stay logged in. We won't need to fetch user and set auth. We should have access in hook/state.
 */

/**
 * COMPONENT
 */
const Cart = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  if (!isLoggedIn) {
    const products = window.localStorage.getItem("products");
  } else {
  }

  //state
  let userId = useSelector((state) => state.auth.id) || null;
  let thisCart = useSelector((state) => state.thisCart) || {};

  let subtotal = thisCart.totalPrice || null;
  let totalQuantity = thisCart.totalQty || null;

  //dispatch
  const dispatch = useDispatch();

  //componentDidMount
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  console.log("this is cart", thisCart);
  const products = thisCart.products || [];
  console.log(products);

  //Delete Button
  const deleteItemHandler = (event) => {
    console.log('The delete button was clicked!');
    console.log(event.target.name)
    dispatch(deleteProduct(userId, event.target.name))
  }

  return (
    <>
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

                <span> | {cartProduct.quantityItem} bag(s) |</span>

                <span> ${product.price} </span>

                <span>
                  <button onClick = {deleteItemHandler} name = {product.id}>Remove Item</button>
                </span>
              </div>
            );
          })}
        </div>
        <div className="cart-totals">
          <span id="cart-total-items">
            You have {totalQuantity} items in your cart.{" "}
          </span>
          <br />
          <span id="cart-subtotal">Subtotal: ${subtotal}</span>
          <br />
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
