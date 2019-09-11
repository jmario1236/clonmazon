import axios from "axios";
import { takeEvery, call, put, all } from "redux-saga/effects";
import {ADD_PRODUCT_TO_CART_REMOTE, ADD_PRODUCT_TO_CART_ERROR, ADD_PRODUCT_TO_CART_SUCESS, ADD_PRODUCT_TO_CART_START,
    GET_CART_USER_ERROR, GET_CART_USER_SUCCESS, GET_CART_USER_START, GET_CART_USER_REMOTE} from "../cons/actions-type";
import { SAVE_SHOPPING_CART } from "../cons/api-url";

export default function* watcherShoppingCartSaga() {
    yield all([
      takeEvery(ADD_PRODUCT_TO_CART_REMOTE, workerAddShoppingSaga),
      takeEvery(GET_CART_USER_REMOTE, workerGetShoppingSaga),
    ]);
}

function* workerAddShoppingSaga(action) {
    try {
        console.log(action.payload);        
        yield put({type: ADD_PRODUCT_TO_CART_START})
        const payload = yield call(addUpdateShopping,action.payload);        
        yield put({ type: ADD_PRODUCT_TO_CART_SUCESS, payload });
    } catch (e) {
        yield put({ type: ADD_PRODUCT_TO_CART_ERROR, payload: e });
    }
  }

  function* workerGetShoppingSaga(action) {
    try {
        console.log(action.payload);        
        yield put({type: GET_CART_USER_START})
        const payload = yield call(getUsersShopping,action.payload);
        console.log(payload);
        yield put({ type: GET_CART_USER_SUCCESS, payload });
    } catch (e) {
        yield put({ type: GET_CART_USER_ERROR, payload: e });
    }
  }

function getUsersShopping(payload){
    return axios.get("http://localhost:3001/shopping/",{params:payload})
    .then(function(res){
      return res.data;
    })
}

function addUpdateShopping(payload) {
    console.log(payload);
    const header = {headers: {'Accept': 'application/json'}}
    return axios.put(SAVE_SHOPPING_CART,payload,header)
    .then(function(res){
        return res.data;
    })
}