import axios from "axios";
import { takeEvery, call, put, all } from "redux-saga/effects";
import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, REGISTER_REMOTE_USER,
    REGISTER_USER_START, REGISTER_USER_SUCESS, REGISTER_USER_ERROR, LOGIN_REMOTE_USER, GET_CART_USER_REMOTE } from "../cons/actions-type";
import { LOGIN_USER_URL } from "../cons/api-url";

export default function* watcherUserSaga() {
    yield all([
        takeEvery(LOGIN_REMOTE_USER, workerLoginUserSaga)
    ]);
    //yield takeEvery(REGISTER_REMOTE_USER, workerRegisterUserSaga);
}

function* workerLoginUserSaga(action){
    try {
        yield put({type: LOGIN_USER_START});
        const payload = yield call(login,action.payload)
        const userid = {userid:payload.user._id}
        yield put({type: GET_CART_USER_REMOTE, userid});
        yield put({type: LOGIN_USER_SUCCESS, payload});
    }catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
}

function login(user){    
    const header = {headers: {'Accept': 'application/json'}}
    return axios.post(LOGIN_USER_URL,user,header)
    .then(function(res){
        return res.data;
    })
}

