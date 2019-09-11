import {ADD_PRODUCT_TO_CART_START, ADD_PRODUCT_TO_CART_SUCESS, ADD_PRODUCT_TO_CART_ERROR,
        GET_CART_USER_START, GET_CART_USER_SUCCESS, GET_CART_USER_ERROR } from "../../cons/actions-type";
const initialState = {
    shoppingcartList:[],
    shoppingCartSession:{},
    loading: false,
    error: null
};

const rootShoppingCartReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_PRODUCT_TO_CART_START:
            return {...state, loading: true}
        case ADD_PRODUCT_TO_CART_SUCESS:
            return {...state, shoppingCartSession: action.payload, loading:false}        
        case ADD_PRODUCT_TO_CART_ERROR:        
            return {...state, loading:false, error:action.payload.error}
        case GET_CART_USER_START:
                return {...state, loading: true}
        case GET_CART_USER_SUCCESS:
                return {...state, shoppingcartList: action.payload, shoppingCartSession:action.payload.filter(u=>u.date_purchase === undefined)[0], loading:false}
        case GET_CART_USER_ERROR:
                return {...state, loading:false, error:action.payload.error}
        default:
            return state;
    }

}

export default rootShoppingCartReducer;