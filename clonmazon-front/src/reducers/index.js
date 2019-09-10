import { combineReducers } from 'redux'
import rootProductReducer from "./productsreducer/productreducer"
import rootUserReducer from "./userreducer/userreducer";


const app = combineReducers({
    products : rootProductReducer,
    user: rootUserReducer
});

export default app;