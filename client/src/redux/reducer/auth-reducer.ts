import {BaseThunkType, InferActionType} from "../redux-store";
import jwt_decode from "jwt-decode";

interface IUserData {
    id: string,
    email: string,
}

const initialState = {
    user: null as IUserData | null,
    isAuth: false,
    isLoading: false
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "auth/SET_USER_DATA" : {
            return {...state, ...action.payload,}
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setAuthUserData: (userData: { id: string, email: string } | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        payload: {user: userData, isAuth}
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return

    const decodedToken: any = jwt_decode(accessToken)

    if (decodedToken?.exp * 1000 < Date.now()) {
        dispatch(actions.setAuthUserData(null, false))
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    } else {
        dispatch(actions.setAuthUserData(decodedToken, true))
    }
}

export const login = (inputValue: IUserData): ThunkType => async (dispatch) => {
    dispatch(actions.setAuthUserData(inputValue, true))
}

export const register = (inputValue: IUserData): ThunkType => async (dispatch) => {
    dispatch(actions.setAuthUserData(inputValue, true))
}

export const logout = (): ThunkType => async (dispatch) => {
    dispatch(actions.setAuthUserData(null, false))
}

export const checkAuth = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData())
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>