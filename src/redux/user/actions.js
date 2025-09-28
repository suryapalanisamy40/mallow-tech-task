
export const getUserRequest = (params) => ({
  type: "GET_USER_REQUEST",
  payload: params,
});

export const getUserSuccess = (data) => ({
  type: "GET_USER_SUCCESS",
  payload: { data },
});

export const getUserFailure = (errorMessage) => ({
  type: "GET_USER_FAILURE",
  errorMessage: { errorMessage },
});

export const resetGetUser = () => ({
  type: "RESET_GET_USER",
});

export const createUserRequest = (data) => ({
  type: "CREATE_USER_REQUEST",
  payload: data,
});

export const createUserSuccess = (data) => ({
  type: "CREATE_USER_SUCCESS",
  payload: { data },
});

export const createUserFailure = (errorMessage) => ({
  type: "CREATE_USER_FAILURE",
  errorMessage: { errorMessage },
});

export const resetCreateUser = () => ({
  type: "RESET_CREATE_USER",
});

export const updateUserRequest = (data, id) => ({
  type: "UPDATE_USER_REQUEST",
  payload: { data, id },
});

export const updateUserSuccess = (data) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: { data },
});

export const updateUserFailure = (errorMessage) => ({
  type: "UPDATE_USER_FAILURE",
  errorMessage: { errorMessage },
});

export const resetUpdateUser = () => ({
  type: "RESET_UPDATE_USER",
});

export const deleteUserRequest = (id) => ({
  type: "DELETE_USER_REQUEST",
  payload: { id },
});

export const deleteUserSuccess = (data) => ({
  type: "DELETE_USER_SUCCESS",
  payload: { data },
});

export const deleteUserFailure = (errorMessage) => ({
  type: "DELETE_USER_FAILURE",
  errorMessage: { errorMessage },
});

export const resetDeleteUser = () => ({
  type: "RESET_DELETE_USER",
});
