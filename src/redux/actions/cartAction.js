import { orderAPI } from '../../apis/productApi'

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CART_CHANGED = 'CART_CHANGED';
export const CLEAR_CART = 'CLEAR_CART';

export const addProductToCartAction = payload => ({ type: ADD_TO_CART, payload });
export const clearCartAction = payload => ({ type: CLEAR_CART, payload });
export const removeProductFromCartAction = payload => ({ type: REMOVE_FROM_CART, payload });
export const changedCart = payload => ({ type: CART_CHANGED, payload });


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
export const orderAction =  (products) => {
    return async dispatch => await orderAPI(products)
        .then(res => {
            console.log(res.data);
            //if (res.data.statusCode === 200)
            {
                dispatch(clearCartAction(null));
                return true;
            }
            //return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
};
