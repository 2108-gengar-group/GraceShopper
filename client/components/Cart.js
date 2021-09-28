/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteProduct } from "../store/cartReducer";

import { useHistory, Link } from "react-router-dom";
import { priceFunction } from "../frontendFunctions";

/**
 *Production Note - once we stay logged in. We won't need to fetch user and set auth. We should have access in hook/state.
 */

/**
 * COMPONENT
 */
const Cart = () => {
  // const isLoggedIn = useSelector((state) => !!state.auth);
  let history = useHistory();
  const goCart = () => {
    history.push("/cart");
  };
  //state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.thisCart);

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchCart(user.id));
    }
  }, [user]);

  //componentDidMount
  if (user && user.id) {
    //dispatch
    const products = cart.products || [];
    //Delete Button
    const deleteItemHandler = (event) => {
      dispatch(deleteProduct(user.id, event.target.name));
      goCart();
    };
    //Cart Total Derivative Variables
    const cartProductQuantity = products.map((product) => {
      return product.Cart_Product.quantity;
    });
    const productPrice = products.map((product) => {
      return product.price;
    });
    const subtotal = productPrice.map((price, index) => {
      const pricePerItem = cartProductQuantity[index] * price;
      return pricePerItem;
    });
    const total = subtotal.reduce((accumulator, value) => {
      const sum = accumulator + value;
      return sum;
    }, 0);

    return (
      <>
        <Link to="/products">
          <strong>Continue Shopping</strong>
        </Link>
        <h1 id="cart-title">Shopping Cart</h1>
        <div className="cart-container">
          <div className="cart-container-items">
            {products.map((product) => {
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

                  <span>
                    | {product.Cart_Product ? product.Cart_Product.quantity : 0} bag(s) |
                  </span>
                  <span> ${product.price / 100} </span>

                  <span>
                    <button onClick={deleteItemHandler} name={product.id}>
                      Remove Item
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="cart-totals">
            <span id="cart-total-items">
              {products.length === 0 ? (
                <h3>Your Cart is Empty...</h3>
              ) : (
                <h3>You have {products.length} items in your cart.</h3>
              )}
            </span>
            <span id="cart-subtotal">
              <h2>Subtotal: ${priceFunction(total)} </h2>
            </span>

            <button>Checkout</button>
            <button>Empty Cart - NA</button>
          </div>
        </div>
      </>
    );
  } else {
    const currProducts = window.localStorage.products || "[]";
    let products = JSON.parse(currProducts);
    const totalQuantity = products.reduce(
      (sum, product) => sum + product.qtyBags,
      0
    );
    const subtotal = products.reduce(
      (sum, product) => sum + product.price/100 * product.qtyBags,
      0
    );
    const deleteItemHandler = (event) => {
      console.log(event.target.name);
      products = products.filter(
        (product) => product.id !== +event.target.name
      );
      window.localStorage.products = JSON.stringify(products);
      goCart();
    };

    return (
      <>
        <h1 id="cart-title">Shopping Cart</h1>
        <div className="cart-container">
          <div className="cart-container-items">
            {products.map((product) => {
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
                  <span> | {product.qtyBags} bag(s) |</span>
                  <span> ${priceFunction(product.price)} </span>
                  <span>
                    <button onClick={deleteItemHandler} name={product.id}>
                      Remove Item
                    </button>
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
  }
};
/**
 * CONTAINER
 */

/**
 * CONTAINER
 */
export default Cart;