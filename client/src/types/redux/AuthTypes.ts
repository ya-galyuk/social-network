import {SET_USER_DATA} from "../../redux/reducer/auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../redux/redux-store";

export type InitialStateType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isLoading: boolean
}

export type ActionsType = SetAuthUserDataActionType

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

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>