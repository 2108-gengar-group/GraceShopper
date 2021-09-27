/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, updateQty } from "../store/productsReducer";
import { addProduct, increaseQty } from "../store/cartReducer";
import { Link, useHistory } from "react-router-dom";

//products/:productId
const SingleProduct = ({ match }) => {
  const [qty, setQty] = useState(0)

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth);

  let singleProduct = useSelector((state) => state.singleProduct);
  let user = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    console.log("in the use effect for single product")
    dispatch(fetchSingleProduct(match.params.id));
  }, []);

  function goCart() {
    history.push("/cart");
  }


  const addToCartHandler = () => {
    if (!isLoggedIn) {
      window.localStorage.setItem();
    } else {
      console.log("The Add To Cart Button was clicked!");
      dispatch(addProduct(user.id, {...singleProduct, quantity: +qty}));
      goCart();
    }
  };

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
          onChange={(e) => setQty(e.target.value)}
          // onChange={(e) => setQty(e.target.value)}
          // value={singleProduct.qtyBags}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </p>
      <button onClick={addToCartHandler}
        type="button"
        >
        Add To Cart
      </button>

      <p>{singleProduct.description}</p>
      <span>Rating: {singleProduct.stars}</span>
    </div>
  </>
  );
};

export default SingleProduct;
