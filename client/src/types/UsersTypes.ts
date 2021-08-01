import {
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    SET_USERS, TOGGLE_IS_FOLLOWING_PROGRESS,
    TOGGLE_IS_LOADING,
    UNFOLLOW
} from "../redux/reducer/users-reducer";
import {ProfilePhotosType} from "./ProfileTypes";

type UsersLocationType = {
    country: string,
    city: string
}

export type UsersType = {
    id: string,
    fullName: string,
    about: string,
    status: string,
    location: UsersLocationType,
    photos: ProfilePhotosType,
    followed: boolean
}
export type InitialStateType = {
    users: Array<UsersType>,
    pageSize: number,
    totalCount: number,
    currentPage: number,
    isLoading: boolean,
    followingInProgress: Array<string> // array of users ids
}

type SetUsersActionPayloadType = {
    users: Array<UsersType>
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    payload: SetUsersActionPayloadType
}

type OnFollowUnfollowActionPayloadType = {
    userId: string
}
export type OnFollowActionType = {
    type: typeof FOLLOW
    payload: OnFollowUnfollowActionPayloadType
}
export type OnUnfollowActionType = {
    type: typeof UNFOLLOW
    payload: OnFollowUnfollowActionPayloadType
}

type SetCurrentPageActionPayloadType = {
    currentPage: number
}
export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    payload: SetCurrentPageActionPayloadType
}

type SetTotalCountActionPayloadType = {
    totalCount: number
}
export type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    payload: SetTotalCountActionPayloadType
}

type ToggleIsLoadingActionPayloadType = {
    isLoading: boolean
}
export type ToggleIsLoadingActionType = {
    type: typeof TOGGLE_IS_LOADING
    payload: ToggleIsLoadingActionPayloadType
}

type ToggleIsFollowingInProgressActionPayloadType = {
    isProgress: boolean,
    userId: string
}
export type ToggleIsFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    payload: ToggleIsFollowingInProgressActionPayloadType
}