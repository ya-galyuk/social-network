import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducer/profile-reducer";
import dialogsReducer from "./reducer/dialogs-reducer";
import usersReducer from "./reducer/users-reducer";
import authReducer from "./reducer/auth-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store