import {v4 as uuidv4} from 'uuid';
import profileAPI from "../../api/profileAPI";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';

let initialState = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ],
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {id: uuidv4(), time: new Date().toISOString(), text: action.postMessage,}
            return {...state, posts: [...state.posts, newPost],};
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status};
        }
        case SET_USER_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos}};
        }
        default: {
            return state;
        }
    }
}

export const addPost = (postMessage) => ({type: ADD_POST, postMessage})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})
export const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(data.status))
}

export const updateUserProfile = (status) => async (dispatch) => {
    const data = await profileAPI.updateUserStatus(status)
    if (!data.resultCode) {
        dispatch(setUserStatus(data.status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (!data.resultCode) {
        dispatch(setUserPhoto(data.photos))
    }
}

export const saveProfileAbout = (profile) => async (dispatch, getState) => {
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

export const saveProfileContacts = (profile) => async (dispatch, getState) => {
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