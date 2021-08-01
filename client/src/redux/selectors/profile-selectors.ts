import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.profile?.status;
}

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}