import {SET_IS_INITIALIZED} from "../../redux/reducer/app-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../redux/redux-store";

export type InitialStateType = {
    initialized: boolean
}

export type ActionsType = SetIsInitializedActionType

export type SetIsInitializedActionType = {
    type: typeof SET_IS_INITIALIZED
}

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>