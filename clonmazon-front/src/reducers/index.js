import { combineReducers } from 'redux'
import rootProductReducer from "./productsreducer/productreducer"
import rootUserReducer from "./userreducer/userreducer";
import rootShoppingCartReducer from "./shoppingcartreducer/shoppingcartreducer";


const app = combineReducers({
    products : rootProductReducer,
    user: rootUserReducer,
    shoppingcart: rootShoppingCartReducer
});

export default app;