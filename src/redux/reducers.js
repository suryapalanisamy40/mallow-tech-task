import { combineReducers } from "redux";

import loginReducer from "./login/reducers";
import userReducer from "./user/reducers";

export default combineReducers({
  loginReducer,
  userReducer,
});
