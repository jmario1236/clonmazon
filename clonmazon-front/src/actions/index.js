import {GET_PRODUCTS, } from "../cons/actions-type"
import { GET_REMOTE_PRODUCT } from "../cons/actions-type";

export function getProduct(payload){
    return {type:GET_PRODUCTS, payload};
};

export function getRemoteProducts(){
    return {type: GET_REMOTE_PRODUCT};
}
