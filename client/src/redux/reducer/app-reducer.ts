import {getAuthUserData} from "./auth-reducer";
import {InitialStateType, SetIsInitializedActionType} from "../../types/AppTypes";

export const SET_IS_INITIALIZED = 'app/SET_IS_INITIALIZED';

let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

export const initialized = () => async (dispatch: any) => {
    await dispatch(getAuthUserData())
    dispatch(setIsInitialized())
}

export default appReducer