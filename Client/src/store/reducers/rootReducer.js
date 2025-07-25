import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";

const commitConfig = {
    storage,
    stateReconciler: authReducer
}
const authConfig = {
    ...commitConfig,
    key: 'auth',
    whiteList: ['isLoggedIn', 'token']
}
const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    post: postReducer,
    app: appReducer
})
export default rootReducer