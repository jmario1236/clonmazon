import { REGISTER_REMOTE_USER, GET_REMOTE_PRODUCT, LOGIN_REMOTE_USER, ADD_PRODUCT_TO_CART_REMOTE, GET_CART_USER_REMOTE, GET_CATEGORY_REMOTE } from "../cons/actions-type";

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