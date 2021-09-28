import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, updateQty } from '../store/productsReducer';
import { addProduct, increaseQty } from '../store/cartReducer';
import { Link, useHistory } from 'react-router-dom';
import { priceFunction } from '../frontendFunctions';
import EditProduct from './EditProduct';

//products/:productId
const SingleProduct = ({ match }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth);
  let singleProduct = useSelector((state) => state.singleProduct);
  let user = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    console.log('in the use effect for single product');
    dispatch(fetchSingleProduct(match.params.id));
  }, []);
  const goCart = () => {
    history.push('/cart');
  };
  // let userId = useSelector((state) => state.auth.id) || null;
  const addToCartHandler = () => {
    if (user && user.id) {
      //the quantity needs to be parsed or else it will change quantity
      dispatch(addProduct(user.id, singleProduct.id, +qty));
      goCart();
    } else {
      let selectedProduct = singleProduct;
      const currProducts = window.localStorage.products || '[]';
      let products = JSON.parse(currProducts);
      if (products.find((product) => product.id === singleProduct.id)) {
        selectedProduct.qtyBags++;
        products = products.filter(
          (product) => product.id !== singleProduct.id
        );
      }
      products = [...products, singleProduct];
      products = JSON.stringify(products);

      window.localStorage.products = products;
      goCart();
    }
  };

  const addToQuantityHandler = (event) => {
    const qty = Number(event.target.value);
    //** Set Qty is required for updating quantity in database, this must be done locally */
    setQty(event.target.value);
    dispatch(updateQty(qty));
  };
  if (!singleProduct) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Link to='/products'>Go Back</Link>
      <h1 id='single-coffee-title'>{singleProduct.name}</h1>
      <div className='singe-coffee-container'>
        <img src={singleProduct.imageUrl} id='singe-coffee-img' />
        <p>${priceFunction(singleProduct.price)}</p>
        <p>
          {singleProduct && singleProduct.quantity > 0
            ? 'In Stock'
            : 'Out of Stock'}
        </p>
        <p className='dropdownMenu'>
          <label htmlFor='quantity'>Quantity:</label>
          <select
            name='qty'
            id='quantity'
            key='quantity'
            onChange={addToQuantityHandler}
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
        </p>
        <button onClick={addToCartHandler} type='button'>
          Add To Cart
        </button>
        <p>{singleProduct.description}</p>
        {/* <span>Rating: {singleProduct.stars}</span> */}
        <br />
        <br />
        <br />
        <br />
        {user && user.isAdmin ? (
          <>
            <h2>Edit Product: </h2>
            <EditProduct />{' '}
          </>
        ) : (
          <div> </div>
        )}
      </div>
    </>
  );
};
export default SingleProduct;