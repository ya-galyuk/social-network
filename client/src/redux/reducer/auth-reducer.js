import authAPI from "../../api/authAPI";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';

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

export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me()
    if (!data.resultCode) {
        let {id, email, login} = data.user
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe)
    if (!data.resultCode) {
        return dispatch(getAuthUserData())
    }
    let message = data.messages.length ? data.messages[0] : "Common error"
    dispatch(stopSubmit("login", {_error: message}))
}

export const logout = () => async (dispatch) => {
    const data = await authAPI.logout()
    if (!data.resultCode) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer