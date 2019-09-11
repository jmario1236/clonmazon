import {GET_PRODUCTS_SUCCESS, GET_PRODUCTS_START, GET_PRODUCTS_ERROR} from "../../cons/actions-type";
const initialState = {
    products:[],
    loading: false,
    error: null
};

const rootProductReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS_START:
            return {...state, loading:true}
        case GET_PRODUCTS_SUCCESS:
            return {...state, products:  [].concat(action.payload), loading:false}
        case GET_PRODUCTS_ERROR:
            return {...state, loading:false, error:action.payload.error}
        default:
            return state;
    }

}

export default rootProductReducer;