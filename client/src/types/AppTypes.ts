import {SET_IS_INITIALIZED} from "../redux/reducer/app-reducer";

export type InitialStateType = {
    initialized: boolean
}

export type SetIsInitializedActionType = {
    type: typeof SET_IS_INITIALIZED
}