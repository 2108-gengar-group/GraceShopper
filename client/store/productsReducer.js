import axios from "axios";


//ACTION TYPES:

const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';

//action creator
export const setProducts = (products) => ({
	type: PRODUCTS_REQUEST,
	products,
});

//thunk creator
export const fetchProducts = () => {
	return async (dispatch) => {
		const { data: products } = await axios.get('/api/products');
		dispatch(setProducts(products));
	};
};

//reducer
export function productsReducer(state = [], action) {
	switch (action.type) {
		case PRODUCTS_REQUEST:
			return action.products;
		default:
			return state;
	}
}


export const SINGLE_PRODUCT_REQUEST = "SINGLE_PRODUCT_REQUEST"

const UPDATE_QTY_REQUEST = "UPDATE_QTY_REQUEST"

export const setSingleProduct = (product) => {
  return {
    type: SINGLE_PRODUCT_REQUEST,
    product: product
  }
}

export const updateQty = (qty) => {
  return {
    type: UPDATE_QTY_REQUEST,
    qty,
  }
}

// quantity: product.Cart_Product.quantity
//Thunk - Fetching single product from axios
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`)
      const productWithQty = {...product}
      dispatch(setSingleProduct(productWithQty))
    } catch (err) {
      console.log(err)
    }
  }
}

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return action.product;
      case UPDATE_QTY_REQUEST:
        return {...state, quantity: action.qty};
    default:
      return state
  }
}
