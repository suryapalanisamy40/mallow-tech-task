export const getLoginRequest = (params) => ({
  type: "GET_LOGIN_REQUEST",
  payload: params,
});

export const getLoginSuccess = (data) => ({
  type: "GET_LOGIN_SUCCESS",
  payload: { data },
});

export const getLoginFailure = (errorMessage) => ({
  type: "GET_LOGIN_FAILURE",
  errorMessage: { errorMessage },
});

export const resetGetLogin = () => ({
  type: "RESET_GET_LOGIN",
});
