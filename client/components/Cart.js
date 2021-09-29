/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteProduct } from "../store/cartReducer";

import { useHistory, Link } from "react-router-dom";
import { priceFunction } from "../frontendFunctions";

//Notes
// USER and CART states cannot change or the user cart won't run
//If things need to change for the guest cart, it must be worked around this code because of the if/else condition
// Everything changed for the guest cart must borrow from this state [cannot be made null] or else the if statement won't run at all.
//The variables inside my if block should have no affect on the guest cart "else" block

const Cart = () => {
  let history = useHistory();
  const goCart = () => {
    history.push("/cart");
  };

  // Checkout Button
  const checkoutHandler = () => {
    history.push("/checkout");
  };

  const dispatch = useDispatch();

  //This cannot change or user cart won't run****  --- This cannot be null or with an "or" operand.
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.thisCart);

  //This cannot change or user cart won't run
  useEffect(() => {
    if (user !== null) {
      dispatch(fetchCart(user.id));
    }
  }, [user]);

  // USER CART BEGINS HERE************************************************************************
  if (user && user.id) {
    //SingleProduct Quantity Totals
    const products = cart.products || [];
    const singleProductQuantity =
      products.map((product) => {
        return product.Cart_Product.quantity;
      }) || {};
    const cartQuantity = singleProductQuantity.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

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
          <strong id="continue-shopping">Continue Shopping</strong>
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
                    | {product.Cart_Product ? product.Cart_Product.quantity : 0}{" "}
                    bag(s) |
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
                <h3>You have {cartQuantity} items in your cart.</h3>
              )}
            </span>
            <span id="cart-subtotal">
              <h2>Subtotal: ${priceFunction(total)} </h2>
            </span>

            <button onClick={checkoutHandler}>Checkout</button>
          </div>
        </div>
      </>
    ); //USER CART ENDS HERE**************************************************************************
  } else {
    const currProducts = window.localStorage.products || "[]";
    let products = JSON.parse(currProducts);
    const totalQuantity = products.reduce(
      (sum, product) => sum + product.qtyBags,
      0
    );
    const subtotal = products.reduce(
      (sum, product) => sum + (product.price / 100) * product.qtyBags,
      0
    );
    const deleteItemHandler = (event) => {
      products = products.filter(
        (product) => product.id !== +event.target.name
      );
      window.localStorage.products = JSON.stringify(products);
      goCart();
    };

    //********* CART COMPONENT ****************************** ****************************************/
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
                    <br />
                    <button class="button2" onClick={deleteItemHandler} name={product.id}>
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
            <button class="button2"onClick={checkoutHandler}>Checkout</button>
          </div>
        </div>
      </>
    );
  }
};

export default Cart;
