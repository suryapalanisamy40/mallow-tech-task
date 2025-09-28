const initialState = {
  getLoginList: [],
  isLoading: false,
  errorMessage: null,
  getLoginSuccess: false,
  getLoginFailure: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_LOGIN_SUCCESS": {
      return {
        ...state,
        getLoginSuccess: true,
        getLoginList: action.payload.data.token,
        getLoginFailure: false,
      };
    }
    case "GET_LOGIN_FAILURE": {
      return {
        ...state,
        getLoginFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getLoginSuccess: false,
      };
    }
    case "RESET_GET_LOGIN": {
      return {
        ...state,
        getLoginSuccess: false,
        getLoginFailure: false,
        getLoginList: [],
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
