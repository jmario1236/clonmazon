import axios from "axios";
import { takeEvery, call, put, all } from "redux-saga/effects";
import {GET_REMOTE_PRODUCT, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_START} from "../cons/actions-type";

export default function* watcherProductsSaga() {
    yield all([
      takeEvery(GET_REMOTE_PRODUCT, workerSaga)
    ]);
}

function* workerSaga(parameters) {
    try {        
        yield put({type: GET_PRODUCTS_START})
        const payload = yield call(getData,parameters);
        yield put({ type: GET_PRODUCTS_SUCCESS, payload });
    } catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
  }

function getData(parameters) {
    if(!parameters.payload){parameters.payload={}}
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      console.log(config)
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
    return axios.get("http://localhost:3001/product/",{params:parameters.payload})
    .then(function(res){
      return res.data;
    })
 }