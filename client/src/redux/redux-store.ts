import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducer/profile-reducer";
import dialogsReducer from "./reducer/dialogs-reducer";
import usersReducer from "./reducer/users-reducer";
import authReducer from "./reducer/auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./reducer/app-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';

let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

type PropsTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropsTypes<T>>

// @ts-ignore
let store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store