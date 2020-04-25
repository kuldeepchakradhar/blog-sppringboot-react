import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducers";
import postReducers from "./postReducers";
import publicReducers from "./publicRecuders";

export default combineReducers({
    errors: errorReducer,
    security: userReducer,
    post: postReducers,
    publicPost: publicReducers
});