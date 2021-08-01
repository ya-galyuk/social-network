import {v4 as uuidv4} from 'uuid';
import profileAPI from "../../api/profileAPI";
import {stopSubmit} from "redux-form";
import {
    ActionsType,
    AddPostActionType,
    DeletePostActionType,
    InitialStateType, ProfilePhotosType, ProfileType, SetUserPhotoActionType,
    SetUserProfileActionType, SetUserStatusActionType, ThunkType
} from "../../types/redux/ProfileTypes";
import {ResultCodes} from "../../enums";

export const ADD_POST = 'profile/ADD_POST';
export const DELETE_POST = 'profile/DELETE_POST';
export const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
export const SET_USER_STATUS = 'profile/SET_USER_STATUS';
export const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';

let initialState: InitialStateType = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ],
    profile: null
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {id: uuidv4(), time: new Date().toISOString(), text: action.payload.postMessage,}
            return {...state, posts: [...state.posts, newPost],};
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postId)};
        }
        case SET_USER_PROFILE: {
            return {...state, profile: {...state.profile, ...action.payload.profile}};
        }
        case SET_USER_STATUS: {
            // @ts-ignore
            return {...state, profile: {...state.profile, ...action.payload}};
        }
        case SET_USER_PHOTO: {
            // @ts-ignore
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

export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.getProfile(userId)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(setUserProfile({...res.data}))
    }
}

export const getUserStatus = (userId: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.getUserStatus(userId)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(setUserStatus(res.data.status))
    }
}

export const updateUserProfile = (status: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.updateUserStatus(status)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(setUserStatus(res.data.status))
    }
}

export const updatePhoto = (file: any): ThunkType => async (dispatch) => {
    const res = await profileAPI.updatePhoto(file)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(setUserPhoto({...res.data}))
    }
}

export const saveProfileAbout = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    // const userId = getState().auth.userId
    const res = await profileAPI.updateProfile(profile)
    if (res.resultCode === ResultCodes.Success) {
        return dispatch(setUserProfile({...res.data}))
        // dispatch(getUserProfile(userId))
    }
    let messages = res.messages.length ? res.messages[0] : "Common error"
    dispatch(stopSubmit("edit-profile-about", {
        about: messages,
        _error: "email err"
    }))
}

export const saveProfileContacts = (profile: ProfileType): ThunkType => async (dispatch: any, getState) => {
    // const userId = getState().auth.userId
    const res = await profileAPI.updateProfile(profile)
    if (res.resultCode === ResultCodes.Success) {
        return dispatch(setUserProfile({...res.data}))
        // dispatch(getUserProfile(userId))
    }
    let messages = res.messages.length ? res.messages[0] : "Common error"
    // @ts-ignore
    dispatch(stopSubmit("edit-profile-contacts", {...messages, _error: "email err"}))
    return Promise.reject({messages})
}


export default profileReducer