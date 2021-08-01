import {v4 as uuidv4} from 'uuid';
import profileAPI from "../../api/profileAPI";
import {stopSubmit} from "redux-form";
import {
    AddPostActionType,
    DeletePostActionType,
    InitialStateType, ProfilePhotosType, ProfileType, SetUserPhotoActionType,
    SetUserProfileActionType, SetUserStatusActionType
} from "../../types/ProfileTypes";

export const ADD_POST = 'profile/ADD_POST';
export const DELETE_POST = 'profile/DELETE_POST';
export const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
export const SET_USER_STATUS = 'profile/SET_USER_STATUS';
export const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';

let initialState = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ],
    profile: null
}

const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {id: uuidv4(), time: new Date().toISOString(), text: action.payload.postMessage,}
            return {...state, posts: [...state.posts, newPost],};
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postId)};
        }
        case SET_USER_PROFILE:
        case SET_USER_STATUS: {
            return {...state, ...action.payload};
        }
        case SET_USER_PHOTO: {
            return {...state, profile: {...state.profile, ...action.payload}};
        }
        default: {
            return state;
        }
    }
}

export const addPost = (postMessage: string): AddPostActionType => ({type: ADD_POST, payload: {postMessage}})
export const deletePost = (postId: string): DeletePostActionType => ({type: DELETE_POST, payload: {postId}})
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    payload: {profile}
})
export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, payload: {status}})
export const setUserPhoto = (photos: ProfilePhotosType): SetUserPhotoActionType => ({
    type: SET_USER_PHOTO,
    payload: {photos}
})

export const getUserProfile = (userId: string) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId: string) => async (dispatch: any) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(data.status))
}

export const updateUserProfile = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateUserStatus(status)
    if (!data.resultCode) {
        dispatch(setUserStatus(data.status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file)
    if (!data.resultCode) {
        dispatch(setUserPhoto(data.photos))
    }
}

export const saveProfileAbout = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    // const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (!data.resultCode) {
        return dispatch(setUserProfile(data.profile))
        // dispatch(getUserProfile(userId))
    }
    let messages = data.messages.length ? data.messages[0] : "Common error"
    dispatch(stopSubmit("edit-profile-about", {
        about: messages,
        _error: "email err"
    }))
}

export const saveProfileContacts = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    // const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (!data.resultCode) {
        return dispatch(setUserProfile(data.profile))
        // dispatch(getUserProfile(userId))
    }
    let messages = data.messages.length ? data.messages[0] : "Common error"
    dispatch(stopSubmit("edit-profile-contacts", {...messages, _error: "email err"}))
    return Promise.reject({messages})
}


export default profileReducer