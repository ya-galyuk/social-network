import {v4 as uuidv4} from 'uuid';
import profileAPI from "../../api/profileAPI";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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
        default: {
            return state;
        }
    }
}

export const addPost = (postMessage) => ({type: ADD_POST, postMessage})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})

export const getUserProfile = (userId) => (dispatch) => {
    return profileAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data))
    })
}

export const getUserStatus = (userId) => (dispatch) => {
    return profileAPI.getUserStatus(userId).then(data => {
        dispatch(setUserStatus(data.status))
    })
}

export const updateUserProfile = (status) => (dispatch) => {
    return profileAPI.updateUserStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(setUserStatus(data.status))
        }
    })
}


export default profileReducer