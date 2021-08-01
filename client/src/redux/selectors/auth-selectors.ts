import {AppStateType} from "../redux-store";

export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.userId
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login
}
export const getIsLoading = (state: AppStateType) => {
    return state.auth.isLoading
}