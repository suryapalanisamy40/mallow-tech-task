import { all } from "redux-saga/effects";

import loginSaga from "./login/saga";
import userSaga from "./user/saga";

export default function* rootSaga() {
  yield all([userSaga(), loginSaga()]);
}
