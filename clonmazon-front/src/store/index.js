import { createStore, applyMiddleware } from "redux";
import app from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";



const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(
    app,
    applyMiddleware(initialiseSagaMiddleware)
)

initialiseSagaMiddleware.run(rootSaga);

export default store;

