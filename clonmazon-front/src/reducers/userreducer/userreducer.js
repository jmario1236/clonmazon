import { REMOVE_ERROR, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
        REGISTER_USER_START, REGISTER_USER_SUCESS, REGISTER_USER_ERROR } from "../../cons/actions-type";

const initialState = {
    user:{},
    loading: false,
    error: null
}

const rootUserReducer = (state=initialState,action) =>{
    switch(action.type){
        case LOGIN_USER_START:
        case REGISTER_USER_START:
            return {...state, loading: true};
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCESS:
            return{...state, user:action.payload, loading:false}
        case LOGIN_USER_ERROR:
        case REGISTER_USER_ERROR:
            return {...state, loading:false, error: action.payload.error}
        case REMOVE_ERROR:
            return {...state, error: action.payload.error}
        default:
            return state;
    }
}

export default rootUserReducer;