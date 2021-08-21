import { ADD_TO_CART, REMOVE_FROM_CART, CART_CHANGED } from "../actions/cartAction"

const initialState = {
    carts: [],
    isCartChanged: false,
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case ADD_TO_CART:
            var indexExits = state.carts.findIndex(x => x.id == payload.id);
            if (indexExits > -1) {
                state.carts[indexExits].quanlity += payload.quanlity;
            }
            else {
                state.carts.push(payload);
            }
            
            state.isCartChanged = !state.isCartChanged;;
            return { ...state.carts, ...state };
        case REMOVE_FROM_CART:
            var indexExits = state.carts.findIndex(x => x.id == payload.id);
            if (indexExits > -1) {
                state.carts.splice(indexExits, 1);
            }
            state.isCartChanged = !state.isCartChanged;
            return { ...state.carts, ...state, ...state.isCartChanged };
        case CART_CHANGED:
            console.log(state);
            state.isCartChanged = payload;
            return { ...state.carts, ...state };
        default:
            return { ...state.carts, ...state };
    }
}
