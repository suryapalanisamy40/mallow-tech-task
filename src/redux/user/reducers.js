const initialState = {
  getUserList: [],
  createUserData: null,
  updateUserData: null,
  isLoading: false,
  errorMessage: null,
  getUserSuccess: false,
  getUserFailure: false,
  createUserSuccess: false,
  createUserFailure: false,
  updateUserSuccess: false,
  updateUserFailure: false,
  deleteUserSuccess: false,
  deleteUserFailure: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_SUCCESS": {
      return {
        ...state,
        getUserSuccess: true,
        getUserList: action.payload.data.data,
        getUserFailure: false,
      };
    }
    case "GET_USER_FAILURE": {
      return {
        ...state,
        getUserFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getUserSuccess: false,
      };
    }
    case "RESET_GET_USER": {
      return {
        ...state,
        getUserSuccess: false,
        getUserFailure: false,
        getUserList: [],
        errorMessage: null,
      };
    }

    case "CREATE_USER_SUCCESS": {
      return {
        ...state,
        createUserSuccess: true,
        createUserData: action.payload.data,
        createUserFailure: false,
      };
    }
    case "CREATE_USER_FAILURE": {
      return {
        ...state,
        createUserFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createUserSuccess: false,
      };
    }
    case "RESET_CREATE_USER": {
      return {
        ...state,
        createUserSuccess: false,
        createUserFailure: false,
        createUserData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_USER_SUCCESS": {
      return {
        ...state,
        updateUserSuccess: true,
        updateUserData: action.payload.data,
        updateUserFailure: false,
      };
    }
    case "UPDATE_USER_FAILURE": {
      return {
        ...state,
        updateUserFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateUserSuccess: false,
      };
    }
    case "RESET_UPDATE_USER": {
      return {
        ...state,
        updateUserSuccess: false,
        updateUserFailure: false,
        updateUserData: null,
        errorMessage: null,
      };
    }

    case "DELETE_USER_SUCCESS": {
      return {
        ...state,
        deleteUserSuccess: true,
        deleteUserFailure: false,
      };
    }
    case "DELETE_USER_FAILURE": {
      return {
        ...state,
        deleteUserFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteUserSuccess: false,
      };
    }
    case "RESET_DELETE_USER": {
      return {
        ...state,
        deleteUserSuccess: false,
        deleteUserFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
