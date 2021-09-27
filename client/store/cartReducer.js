import axios from 'axios';

//Action Types

const CART_REQUEST = 'CART_REQUEST';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

//Action Creator

const setCart = (cart) => ({
  type: CART_REQUEST,
  cart,
});

const setProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

// Thunk

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data: userCart } = await axios.get(`/api/cart/${id}`);
      //moves the through tables property into the actual product (from the products array)
      const consolidateProducts = userCart.products.map((product) => {
        return  { ...product, quantity: product.Cart_Product.quantity }
      })
      dispatch(setCart({ ...userCart, products: consolidateProducts }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/cart/${userId}`, {productId: product.id, quantity: product.quantity});
      dispatch(setProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};


export const deleteProduct = (userId, productId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/${userId}`, { productId });
      dispatch(fetchCart(userId));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REQUEST:
      return action.cart;
    case ADD_PRODUCT: {
      let products = state.products || [];
      let newArray = products.filter((item) => item.id !== action.product.id);
      newArray.push(action.product);
      return { ...state, products: newArray };
    }
    default:
      return state;
  }
};

