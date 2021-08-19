import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.profile?.status;
}

export const getPhotos = (state: AppStateType) => {
    return state.profilePage.profile?.photos;
}

export const getContacts = (state: AppStateType) => {
    return state.profilePage.profile?.contacts;
}

export const getAbout = (state: AppStateType) => {
    return state.profilePage.profile?.about;
}

export const getJob = (state: AppStateType) => {
    return state.profilePage.profile?.job;
}

export const getFullName = (state: AppStateType) => {
    return state.profilePage.profile?.fullName;
}

export const getEducations = (state: AppStateType) => {
    return state.profilePage.profile?.educations;
}

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}