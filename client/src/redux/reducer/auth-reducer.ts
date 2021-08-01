import authAPI from "../../api/authAPI";
import {stopSubmit} from "redux-form";
import {ResultCodes} from "../../enums";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionType} from "../redux-store";

type InitialStateType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isLoading: boolean
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isLoading: false
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA" : {
            return {...state, ...action.payload,};
        }
        default: {
            return state;
        }
    }
}

type ActionsTypes = InferActionType<typeof actions>

export const actions = {
    setAuthUserData: (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === ResultCodes.Success) {
        let {userId, email, login} = data.data
        dispatch(actions.setAuthUserData(userId, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === ResultCodes.Success) {
        return dispatch(getAuthUserData())
    }
    let message = data.messages.length ? data.messages[0] : "Common error"
    dispatch(stopSubmit("login", {_error: message}))
}

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer