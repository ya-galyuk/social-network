import {AppStateType} from "../redux-store";

export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.user?.id
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}


export const getLogin = (state: AppStateType) => {
    return state.auth.user?.email
}
/*export const getIsLoading = (state: AppStateType) => {
    return state.auth.isLoading
}*/
