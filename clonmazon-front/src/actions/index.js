import { REMOVE_ERROR_SHOPPING, PAY_CART_USER_REMOTE, REMOVE_ERROR, REGISTER_REMOTE_USER, GET_REMOTE_PRODUCT, LOGIN_REMOTE_USER, ADD_PRODUCT_TO_CART_REMOTE, GET_CART_USER_REMOTE, GET_CATEGORY_REMOTE } from "../cons/actions-type";

export function eraseError(){
    return {type:REMOVE_ERROR, payload:{error:''}}
}

export function eraseErrorShopping(){
    return {type:REMOVE_ERROR_SHOPPING, payload:{error:''}}
}

export function payShoppingCartRemote(payload){
    return {type: PAY_CART_USER_REMOTE, payload};
}

export function registerRemoteUser(payload){
    return {type:REGISTER_REMOTE_USER, payload};
};

export function loginRemoteUser(payload){
    return {type:LOGIN_REMOTE_USER, payload};
};

export function getRemoteProducts(payload){
    return {type: GET_REMOTE_PRODUCT, payload};
}

export function addProductToShoppingCartRemote(payload){
    return {type: ADD_PRODUCT_TO_CART_REMOTE, payload};
}

export function getUsersShoppingCarts(payload){
    return {type: GET_CART_USER_REMOTE, payload};
}

export function getCategoriesRemote(payload){
    return {type: GET_CATEGORY_REMOTE, payload};
}