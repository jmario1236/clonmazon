import { takeEvery, call, put } from "redux-saga/effects";
import {GET_REMOTE_PRODUCT, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_START} from "../cons/actions-type";

export default function* watcherProductsSaga() {
    yield takeEvery(GET_REMOTE_PRODUCT, workerSaga);
}

function* workerSaga() {
    try {
        yield put({type: GET_PRODUCTS_START})
        const payload = yield call(getData);
        yield put({ type: GET_PRODUCTS_SUCCESS, payload });
    } catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
  }

function getData() {
    return fetch("http://localhost:3001/product/").then(response =>
      response.json()
    );
 }