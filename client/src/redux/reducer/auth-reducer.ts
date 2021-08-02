import authAPI from "../../api/auth-api";
import {FormAction, stopSubmit} from "redux-form";
import {ResultCodes} from "../../enums";
import {BaseThunkType, InferActionType} from "../redux-store";

let initialState = {
    userId: null as (string | null),
    email: null as (string | null),
    login: null as (string | null),
    isAuth: false,
    isLoading: false
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_USER_DATA" : {
            return {...state, ...action.payload,};
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setAuthUserData: (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'AUTH/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const res = await authAPI.me()
    if (res.resultCode === ResultCodes.Success) {
        let {userId, email, login} = res.data
        dispatch(actions.setAuthUserData(userId, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    const res = await authAPI.login(email, password, rememberMe)
    if (res.resultCode === ResultCodes.Success) {
        return dispatch(getAuthUserData())
    }
    let message = res.messages.length ? res.messages[0] : "Common error"
    dispatch(stopSubmit("login", {_error: message}))
}

export const logout = (): ThunkType => async (dispatch) => {
    const res = await authAPI.logout()
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>