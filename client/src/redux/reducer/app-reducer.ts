import {getAuthUserData} from "./auth-reducer";
import {AppStateType, InferActionType} from "../redux-store";
import {ThunkAction} from "redux-thunk";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_IS_INITIALIZED" : {
            return {...state, initialized: true};
        }
        default: {
            return state;
        }
    }
}

type ActionsTypes = InferActionType<typeof actions>

export const actions = {
    setIsInitialized: () => ({type: 'SET_IS_INITIALIZED'} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initialized = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(actions.setIsInitialized())
}

export default appReducer