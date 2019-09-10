import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "../../cons/actions-type";

const initialState = {
    user:{},
    loading: false,
    error: null
}

const rootUserReducer = (state=initialState,action) =>{
    switch(action.type){
        case LOGIN_USER_START:
            return {...state, loading: true};
        case LOGIN_USER_SUCCESS:
            return{...state, user:action.payload, loading:false}
        case LOGIN_USER_ERROR:
            return {...state, loading:false, error:action.payload}
        default:
            return state;
    }
}

export default rootUserReducer;