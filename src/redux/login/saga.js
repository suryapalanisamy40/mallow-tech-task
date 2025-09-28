import { call, put, takeEvery } from "redux-saga/effects";
import { getLogin } from "../../api/loginApi";
import { getLoginSuccess, getLoginFailure } from "./actions";

function* fetchLoginSaga(action) {
  try {
    const data = yield call(getLogin, action.payload);
    yield put(getLoginSuccess(data));
  } catch (error) {
    let errorMessage = "An unexpected error occurred";
    if (error.message) {
      const parsed = JSON.parse(error.message);
      errorMessage = parsed.error || errorMessage;
    }
    yield put(getLoginFailure(errorMessage));
  }
}

export default function* loginSaga() {
  yield takeEvery("GET_LOGIN_REQUEST", fetchLoginSaga);
}
