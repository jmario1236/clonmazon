import { GET_CATEGORY_START, GET_CATEGORY_SUCCESS,  GET_CATEGORY_ERROR} from "../../cons/actions-type";
const initialState = {
    categories:[],
    loading: false,
    error: null
};

const rootCategoryReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_CATEGORY_START:
            return {...state, loading:true}
        case GET_CATEGORY_SUCCESS:
            return {...state, categories:  [].concat(action.payload), loading:false}
        case GET_CATEGORY_ERROR:
            return {...state, loading:false, error:action.payload.error}
        default:
            return state;
    }

}

export default rootCategoryReducer;