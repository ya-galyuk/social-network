import authAPI from "../../api/authAPI";
import {stopSubmit} from "redux-form";
import {InitialStateType, SetAuthUserDataActionType} from "../../types/AuthTypes";

export const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isLoading: false
}

const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA : {
            return {...state, ...action.payload,};
        }
        default: {
            return state;
        }
    }
}

export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getAuthUserData = () => async (dispatch: any) => {
    const data = await authAPI.me()
    if (!data.resultCode) {
        let {id, email, login} = data.user
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe)
    if (!data.resultCode) {
        return dispatch(getAuthUserData())
    }
    let message = data.messages.length ? data.messages[0] : "Common error"
    dispatch(stopSubmit("login", {_error: message}))
}

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout()
    if (!data.resultCode) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer