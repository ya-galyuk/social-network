import {v4 as uuidv4} from 'uuid';
import profileAPI from "../../api/profileAPI";
import {stopSubmit} from "redux-form";
import {PostsType, ProfilePhotosType, ProfileType} from "../../types/redux/ProfileTypes";
import {ResultCodes} from "../../enums";
import {AppStateType, InferActionType} from "../redux-store";
import {ThunkAction} from "redux-thunk";

type InitialStateType = {
    posts: Array<PostsType>,
    profile: ProfileType | null
}

let initialState: InitialStateType = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ],
    profile: null
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_POST" : {
            let newPost = {id: uuidv4(), time: new Date().toISOString(), text: action.payload.postMessage,}
            return {...state, posts: [...state.posts, newPost],};
        }
        case "DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postId)};
        }
        case "SET_USER_PROFILE": {
            return {...state, profile: {...state.profile, ...action.payload.profile}};
        }
        case "SET_USER_STATUS": {
            // @ts-ignore
            return {...state, profile: {...state.profile, ...action.payload}};
        }
        case "SET_USER_PHOTO": {
            // @ts-ignore
            return {...state, profile: {...state.profile, ...action.payload}};
        }
        default: {
            return state;
        }
    }
}

type ActionsTypes = InferActionType<typeof actions>

export const actions = {
    addPost: (postMessage: string) => ({type: 'ADD_POST', payload: {postMessage}} as const),
    deletePost: (postId: string) => ({type: 'DELETE_POST', payload: {postId}} as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'SET_USER_PROFILE',
        payload: {profile}
    } as const),
    setUserStatus: (status: string) => ({type: 'SET_USER_STATUS', payload: {status}} as const),
    setUserPhoto: (photos: ProfilePhotosType) => ({
        type: 'SET_USER_PHOTO',
        payload: {photos}
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

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

export const updateUserProfile = (status: string): ThunkType => async (dispatch) => {
    const res = await profileAPI.updateUserStatus(status)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserStatus(res.data.status))
    }
}

export const updatePhoto = (file: any): ThunkType => async (dispatch) => {
    const res = await profileAPI.updatePhoto(file)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserPhoto({...res.data}))
    }
}

export const saveProfileAbout = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    // const userId = getState().auth.userId
    const res = await profileAPI.updateProfile(profile)
    if (res.resultCode === ResultCodes.Success) {
        return dispatch(actions.setUserProfile({...res.data}))
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
        return dispatch(actions.setUserProfile({...res.data}))
        // dispatch(getUserProfile(userId))
    }
    let messages = res.messages.length ? res.messages[0] : "Common error"
    // @ts-ignore
    dispatch(stopSubmit("edit-profile-contacts", {...messages, _error: "email err"}))
    return Promise.reject({messages})
}


export default profileReducer