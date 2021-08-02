import {v4 as uuidv4} from 'uuid';
import profileAPI from "../../api/profile-api";
import {FormAction, stopSubmit} from "redux-form";
import {PostsType, ProfileContactsType, ProfilePhotosType, ProfileType} from "../../types/redux/ProfileTypes";
import {ResultCodes} from "../../enums";
import {BaseThunkType, InferActionType} from "../redux-store";

let initialState = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ] as Array<PostsType>,
    profile: null as (ProfileType | null)
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PROFILE/ADD_POST" : {
            let newPost = {id: uuidv4(), time: new Date().toISOString(), ...action.payload,}
            return {...state, posts: [...state.posts, newPost],};
        }
        case "PROFILE/DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postId)};
        }
        case "PROFILE/SET_USER_PROFILE": {
            return {...state, profile: {...state.profile, ...action.payload.profile}};
        }
        case "PROFILE/SET_USER_STATUS": {
            if (state.profile?.status) {
                return {...state, profile: {...state.profile, ...action.payload}};
            }
            return {...state}
        }
        case "PROFILE/SET_USER_PHOTO": {
            if (state.profile?.photos) {
                return {...state, profile: {...state.profile, ...action.payload}};
            }
            return {...state}
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    addPost: (text: string) => ({type: 'PROFILE/ADD_POST', payload: {text}} as const),
    deletePost: (postId: string) => ({type: 'PROFILE/DELETE_POST', payload: {postId}} as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'PROFILE/SET_USER_PROFILE',
        payload: {profile}
    } as const),
    setUserStatus: (status: string) => ({type: 'PROFILE/SET_USER_STATUS', payload: {status}} as const),
    setUserPhoto: (photos: ProfilePhotosType) => ({
        type: 'PROFILE/SET_USER_PHOTO',
        payload: {photos}
    } as const),
}

export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.getProfile(userId)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserProfile({...res.data}))
    }
}

export const getUserStatus = (userId: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.getUserStatus(userId)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserStatus(res.data.status))
    }
}

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.updateUserStatus(status)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserStatus(res.data.status))
    }
}

export const updatePhoto = (file: File): ThunkType => async (dispatch) => {
    const res = await profileAPI.updatePhoto(file)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserPhoto({...res.data}))
    }
}

export const saveProfileAbout = (about: string): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    if (!userId){
        throw new Error("userId can't be null")
    }
    const res = await profileAPI.updateProfileAbout(about)
    if (res.resultCode === ResultCodes.Success) {
        await dispatch(getUserProfile(userId))
    }
    if (res.resultCode === ResultCodes.Error) {
        let messages = res.messages.length ? res.messages[0] : "Common error"
        dispatch(stopSubmit("edit-profile-about", {
            about: messages,
            _error: "email err"
        }))
    }
}

export const saveProfileContacts = (contacts: ProfileContactsType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    if (!userId){
        throw new Error("userId can't be null")
    }
    const res = await profileAPI.updateProfileContacts(contacts)
    if (res.resultCode === ResultCodes.Success) {
        await dispatch(getUserProfile(userId))
    }
    if (res.resultCode === ResultCodes.Error) {
        let errors = res.messages.length ? res.messages[0] : "Common error"
        typeof errors === "object" ? errors = {...errors} : errors = {_error: errors}
        dispatch(stopSubmit("edit-profile-contacts", errors))
        return Promise.reject(errors)
    }
}


export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>