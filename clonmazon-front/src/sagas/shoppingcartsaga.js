import axios from "axios";
import { takeEvery, call, put, all } from "redux-saga/effects";
import {ADD_PRODUCT_TO_CART_REMOTE, ADD_PRODUCT_TO_CART_ERROR, ADD_PRODUCT_TO_CART_SUCESS, ADD_PRODUCT_TO_CART_START,
        GET_CART_USER_ERROR, GET_CART_USER_SUCCESS, GET_CART_USER_START, GET_CART_USER_REMOTE,
        PAY_CART_USER_REMOTE, PAY_CART_USER_START, PAY_CART_USER_SUCCESS, PAY_CART_USER_ERROR} from "../cons/actions-type";
import { SAVE_SHOPPING_CART, PAY_SHOPPING_CART } from "../cons/api-url";

export default function* watcherShoppingCartSaga() {
    yield all([
      takeEvery(ADD_PRODUCT_TO_CART_REMOTE, workerAddShoppingSaga),
      takeEvery(GET_CART_USER_REMOTE, workerGetShoppingSaga),
      takeEvery(PAY_CART_USER_REMOTE, workerPayShoppingSaga),
    ]);
}

function* workerPayShoppingSaga(action) {
    try {  
        yield put({type: PAY_CART_USER_START})
        const payload = yield call(payShopping,action.payload);        
        yield put({ type: PAY_CART_USER_SUCCESS, payload });
    } catch (e) {
        yield put({ type: PAY_CART_USER_ERROR, payload: e });
    }
  }

function* workerAddShoppingSaga(action) {
    try {  
        yield put({type: ADD_PRODUCT_TO_CART_START})
        const payload = yield call(addUpdateShopping,action.payload);        
        yield put({ type: ADD_PRODUCT_TO_CART_SUCESS, payload });
    } catch (e) {
        yield put({ type: ADD_PRODUCT_TO_CART_ERROR, payload: e });
    }
  }

  function* workerGetShoppingSaga(action) {
    try {
        console.log(action);        
        yield put({type: GET_CART_USER_START})
        const payload = yield call(getUsersShopping,action.payload);
        console.log(payload);
        yield put({ type: GET_CART_USER_SUCCESS, payload });
    } catch (e) {
        yield put({ type: GET_CART_USER_ERROR, payload: e });
    }
  }

function getUsersShopping(payload){
    console.log(payload)
    return axios.get("http://localhost:3001/shopping/",{params:payload})
    .then(function(res){
      return res.data;
    })
}

function payShopping(payload){
    const header = {headers: {'Accept': 'application/json'}}
    return axios.put(PAY_SHOPPING_CART,payload,header)
    .then(function(res){
        return res.data;
    }).catch((err)=>{
        throw err.response.data;
    })
}

function addUpdateShopping(payload) {
    console.log(payload);
    const header = {headers: {'Accept': 'application/json'}}
    return axios.put(SAVE_SHOPPING_CART,payload,header)
    .then(function(res){
        return res.data;
    }).catch((err)=>{
        throw err.response.data;
    })
}