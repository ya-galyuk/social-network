import authAPI from "../../api/authAPI";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isLoading: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA : {
            return {...state, ...action.payload,};
        }
        default: {
            return state;
        }
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.user
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    return authAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            return dispatch(getAuthUserData())
        }
        let message = data.messages.length ? data.messages[0]: "Common error"
        dispatch(stopSubmit("login", {_error: message}))
    })
}

export const logout = () => (dispatch) => {
    return authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
}

export default authReducer