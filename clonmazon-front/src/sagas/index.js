import { all, fork } from "redux-saga/effects";
import  watcherUserSaga  from "./usersaga";
import watcherProductsSaga from "./productsaga";
import watcherShoppingCartSaga from "./shoppingcartsaga";
import watcherCategoriesSaga from "./categoriesaga";

export default function* rootSaga(){
    yield all([
            fork(watcherUserSaga),
            fork(watcherProductsSaga),
            fork(watcherShoppingCartSaga),
            fork(watcherCategoriesSaga)
    ])
}