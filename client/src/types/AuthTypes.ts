import {SET_USER_DATA} from "../redux/reducer/auth-reducer";

export type InitialStateType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isLoading: boolean
}

type SetAuthUserDataActionPayloadType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}