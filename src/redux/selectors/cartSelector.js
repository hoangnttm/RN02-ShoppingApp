export const getProductInCart = state => {
    return state.cartReducer.carts;
};
export const getProductInCartChanged = state => {
    return state.cartReducer.isCartChanged;
};