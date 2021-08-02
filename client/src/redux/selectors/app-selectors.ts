import {AppStateType} from "../redux-store";

export const getAppInitialized = (state: AppStateType) => {
    return state.app.initialized
}