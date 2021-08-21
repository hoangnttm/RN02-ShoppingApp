import { combineReducers } from 'redux';
import loginReducer from './loginReducer'
import cartReducer from './cartReducer'
import favouriteReducer from './favouriteReducer'

const rootReducer = combineReducers({
    loginReducer,
    cartReducer,
    favouriteReducer
});

export default rootReducer;