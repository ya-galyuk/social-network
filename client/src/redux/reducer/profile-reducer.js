import profileAPI from "../../api/profileAPI";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {
            id: '1',
            time: 'time-1',
            text: 'post text 1',
        },
        {
            id: '2',
            time: 'time-2',
            text: 'Post text 2',
        },
    ],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {id: '5', time: 'time-new', text: state.newPostText,}
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText};
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

export const addPost = () => ({type: ADD_POST})
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text})
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