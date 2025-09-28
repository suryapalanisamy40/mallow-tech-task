import { call, put, takeEvery } from "redux-saga/effects";
import { createUser, deleteUser, getUser, updateUser } from "../../api/userApi";
import {
  getUserSuccess,
  getUserFailure,
  createUserSuccess,
  createUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
} from "./actions";

function* fetchUserSaga(action) {
  try {
    const data = yield call(getUser, action.payload);
    yield put(getUserSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : "An unexpected error occurred";

    yield put(getUserFailure(errorMessage));
  }
}

function* createUserSaga(action) {
  try {
    const data = yield call(createUser, action.payload);
    yield put(createUserSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : "An unexpected error occurred";

    yield put(createUserFailure(errorMessage));
  }
}

function* updateUserSaga(action) {
  try {
    const data = yield call(updateUser, action.payload.data, action.payload.id);
    yield put(updateUserSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : "An unexpected error occurred";

    yield put(updateUserFailure(errorMessage));
  }
}

function* deleteUserSaga(action) {
  try {
    const data = yield call(deleteUser, action.payload.id);
    yield put(deleteUserSuccess(data));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeEvery("GET_USER_REQUEST", fetchUserSaga);
  yield takeEvery("CREATE_USER_REQUEST", createUserSaga);
  yield takeEvery("UPDATE_USER_REQUEST", updateUserSaga);
  yield takeEvery("DELETE_USER_REQUEST", deleteUserSaga);
}
