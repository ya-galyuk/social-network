import {combineReducers, createStore} from "redux";
import profileReducer from "./reducer/profile-reducer";
import dialogsReducer from "./reducer/dialogs-reducer";

let reducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer,
})

let store = createStore(reducers);

export default store