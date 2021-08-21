import {orderAPI} from '../../apis/productApi'

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CART_CHANGED = 'CART_CHANGED';

export const addProductToCartAction = payload => ({type: ADD_TO_CART, payload});
export const removeProductFromCartAction = payload => ({type: REMOVE_FROM_CART, payload});
export const changedCart = payload => ({type: CART_CHANGED, payload});


export const fetchCartsAction = () => {
    return dispatch => {
        dispatch(changedCart(false));
    };
  };

  export const addToCart = (payload) => {
    return dispatch => {
        dispatch(addProductToCartAction(payload));
    };
  };
  export const orderAction = async (products) => {
    return await orderAPI(products)
        .then(res => {
            console.info(res);
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        });
};
  