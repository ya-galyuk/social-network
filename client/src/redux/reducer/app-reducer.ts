import {getAuthUserData} from "./auth-reducer";
import {ActionsType, InitialStateType, SetIsInitializedActionType, ThunkType} from "../../types/redux/AppTypes";

export const SET_IS_INITIALIZED = 'app/SET_IS_INITIALIZED';

let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED : {
            return {...state, initialized: true};
        }
        default: {
            return state;
        }
    }
}

export const setIsInitialized = (): SetIsInitializedActionType => ({type: SET_IS_INITIALIZED})

export const initialized = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(setIsInitialized())
}

export default appReducer