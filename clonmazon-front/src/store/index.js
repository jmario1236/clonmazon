import { createStore, applyMiddleware } from "redux";
import app from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import watcherProductsSaga from "../sagas/productsaga";


const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(
    app,
    applyMiddleware(initialiseSagaMiddleware)
)

initialiseSagaMiddleware.run(watcherProductsSaga);

export default store;

