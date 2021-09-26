/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, updateQty } from "../store/productsReducer";
import { addProduct, increaseQty } from "../store/cartReducer";
import { Link, useHistory } from "react-router-dom";

//products/:productId
const SingleProduct = ({ match }) => {
  // = mapDispatchToProps
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // = mapStateToProps
  let singleProduct = useSelector((state) => state.singleProduct) || null;
  let userId = useSelector((state) => state.auth.id) || null;
  const history = useHistory();

  console.log(singleProduct);

  //same as componentDidMount
  useEffect(() => {
    dispatch(fetchSingleProduct(match.params.id));
  }, []);

  function goCart() {
    history.push("/cart");
  }

  //Add Button Handler
  const addToCartHandler = () => {
    //When the "add to cart" button is clicked - our cart's total quantity should increase.
    if (!isLoggedIn) {
      window.localStorage.setItem();
    } else {
      console.log("The Add To Cart Button was clicked!");
      dispatch(addProduct(userId, singleProduct));
      goCart();
    }
  };

  //Add To Quantity Handler
  const addToQuantityHandler = (event) => {
    console.log("Customer changed quantity of the item!");
    const qty = Number(event.target.value);
    dispatch(updateQty(qty));
  };

  if (!singleProduct) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link to="/products">Go Back</Link>
      <h1 id="single-coffee-title">{singleProduct.name}</h1>
      <div className="singe-coffee-container">
        <img src={singleProduct.imageUrl} id="singe-coffee-img" />
        <p>${singleProduct.price}</p>
        <p>
          {singleProduct && singleProduct.quantity > 0
            ? "In Stock"
            : "Out of Stock"}
        </p>
        <p className="dropdownMenu">
          <label htmlFor="quantity">Quantity:</label>
          <select
            name="qty"
            id="quantity"
            key="quantity"
            onChange={addToQuantityHandler}
            value={singleProduct.qtyBags}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </p>
        <button onClick={addToCartHandler} type="button">
          Add To Cart
        </button>

        <p>{singleProduct.description}</p>
        <span>Rating: {singleProduct.stars}</span>
      </div>
    </>
  );
};

export default SingleProduct;
