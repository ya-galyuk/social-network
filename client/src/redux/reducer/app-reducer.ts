import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionType} from "../redux-store";

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "APP/SET_IS_INITIALIZED" : {
            return {...state, initialized: true};
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setIsInitialized: () => ({type: 'APP/SET_IS_INITIALIZED'} as const)
}

export const initialized = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(actions.setIsInitialized())
}

export default appReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>