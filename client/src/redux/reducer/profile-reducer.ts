import {v4 as uuidv4} from 'uuid';
import {profileAPI} from "../../api/profile-api";
import {FormAction, stopSubmit} from "redux-form";
import {
    IProfileContacts,
    PostsType,
    ProfileDetails,
    ProfilePhotosType,
    ProfileType
} from "../../types/redux/ProfileTypes";
import {ResultCodes} from "../../enums";
import {BaseThunkType, InferActionType} from "../redux-store";
import moment from "moment";

let initialState = {
    posts: [
        {
            id: '1',
            href: 'https://ant.design',
            author: 'Han Solo 1',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: moment().fromNow(),
            action: {like: 128, comment: 0,}
        },
        {
            id: '2',
            href: 'https://ant.design',
            author: 'Han Solo 2',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: moment().fromNow(),
            action: {like: 2, comment: 0,}
        },
    ] as Array<PostsType>,
    profile: null as (ProfileType | null)
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PROFILE/ADD_POST" : {
            let newPost = {
                id: uuidv4(),
                author: 'Han Solo Han Solo',
                avatar: null,
                datetime: moment().fromNow(),
                action: {like: 0, comment: 0},
                ...action.payload,
            }
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
    addPost: (content: string) => ({type: 'PROFILE/ADD_POST', payload: {content}} as const),
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

export const updatePhoto = (file: File): ThunkType => async (dispatch) => {
    const res = await profileAPI.updatePhoto(file)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserPhoto({...res.data}))
    }
}

export const saveProfileAbout = (about: string | null): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.user?.id
    if (!userId) {
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

export const saveProfileContacts = (contacts: IProfileContacts): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.user?.id
    if (!userId) {
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

export const updateProfileDetails = (details: ProfileDetails): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.user?.id
    if (!userId) {
        throw new Error("userId can't be null")
    }
    const res = await profileAPI.updateProfileDetails(details)
    if (res.resultCode === ResultCodes.Success) {
        await dispatch(getUserProfile(userId))
    }
    if (res.resultCode === ResultCodes.Error) {
        console.log(res.messages)
    }
}


export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>