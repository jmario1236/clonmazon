import { combineReducers } from 'redux'
import rootProductReducer from "./productsreducer/productreducer"
import rootUserReducer from "./userreducer/userreducer";
import rootShoppingCartReducer from "./shoppingcartreducer/shoppingcartreducer";
import rootCategoryReducer from "./categoriesreducer/categoriesreducer";


const app = combineReducers({
    products : rootProductReducer,
    user: rootUserReducer,
    shoppingcart: rootShoppingCartReducer,
    categories: rootCategoryReducer
});

export default app;