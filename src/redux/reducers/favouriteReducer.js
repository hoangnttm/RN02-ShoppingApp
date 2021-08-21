import { LIKE_PRODUCT, UNLIKE_PRODUCT, FETCH_PRODUCT_FAVOURITE } from "../actions/productAction"

const initialState = {
    productsFavorite: [],
    isListChanged: false,
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case LIKE_PRODUCT:
            var indexExits = state.productsFavorite.findIndex(x => x.id == payload.id);
            if (indexExits > -1) {
                state.productsFavorite[indexExits].quanlity += payload.quanlity;
            }
            else {
                state.productsFavorite.push(payload);
            }
            return { ...state, productsFavorite: [...state.productsFavorite] };
        case UNLIKE_PRODUCT:
            let newState1 = [ ...state.productsFavorite ];
            console.log(newState1);
            var indexExits = newState1.findIndex(x => x.id == payload);
            if (indexExits > -1) {
                newState1.splice(indexExits, 1);
            }
            return { ...state, productsFavorite: newState1 };

        case FETCH_PRODUCT_FAVOURITE:
            console.log(payload);
            state.productsFavorite = payload;
            return { ...state };
        default:
            return { ...state };
    }
}
