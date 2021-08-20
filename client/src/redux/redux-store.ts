import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducer/profile-reducer";
import dialogsReducer from "./reducer/dialogs-reducer";
import usersReducer from "./reducer/users-reducer";
import authReducer from "./reducer/auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./reducer/app-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import chatReducer from "./reducer/chat-reducer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    chat: chatReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

export type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store