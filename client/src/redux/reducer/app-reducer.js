import {getAuthUserData} from "./auth-reducer";

const SET_IS_INITIALIZED = 'app/SET_IS_INITIALIZED';

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_INITIALIZED : {
            return {...state, initialized: true};
        }
        default: {
            return state;
        }
    }
}

export const setIsInitialized = () => ({type: SET_IS_INITIALIZED})

export const initialized = () => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(setIsInitialized())
}

export default appReducer