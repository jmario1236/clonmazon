import axios from "axios";
import { takeEvery, call, put, all } from "redux-saga/effects";
import {GET_CATEGORY_ERROR, GET_CATEGORY_SUCCESS, GET_CATEGORY_START, GET_CATEGORY_REMOTE} from "../cons/actions-type";

export default function* watcherCategoriesSaga() {
    yield all([
      takeEvery(GET_CATEGORY_REMOTE, workerGetCategoriesSaga)
    ]);
}

function* workerGetCategoriesSaga(action) {
    try {        
        yield put({type: GET_CATEGORY_START})
        const payload = yield call(getData,action.payload);
        yield put({ type: GET_CATEGORY_SUCCESS, payload });
    } catch (e) {
        yield put({ type: GET_CATEGORY_ERROR, payload: e });
    }
  }

function getData(parameters) {
    if(!parameters){parameters={}}
    return axios.get("http://localhost:3001/category/",{params:parameters.payload})
    .then(function(res){
      return res.data;
    })
 }