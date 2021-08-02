import usersAPI from "../../api/users-api";
import {updateObjectInArray} from "../../utils/helpers/object-helper";
import {UserType} from "../../types/redux/UsersTypes";
import {ResultCodes} from "../../enums";
import {BaseThunkType, InferActionType} from "../redux-store";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 3,
    totalCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<string> // array of users ids
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "USERS/SET_USERS":
        case "USERS/SET_CURRENT_PAGE":
        case "USERS/SET_TOTAL_COUNT":
        case "USERS/TOGGLE_IS_LOADING": {
            return {...state, ...action.payload};
        }
        case "USERS/FOLLOW" : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            };
        }
        case "USERS/UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
            };
        }
        case "USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.payload.isProgress
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', payload: {users}} as const),
    onFollow: (userId: string) => ({type: 'USERS/FOLLOW', payload: {userId}} as const),
    onUnfollow: (userId: string) => ({type: 'USERS/UNFOLLOW', payload: {userId}} as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'USERS/SET_CURRENT_PAGE',
        payload: {currentPage}
    } as const),
    setTotalCount: (totalCount: number) => ({
        type: 'USERS/SET_TOTAL_COUNT',
        payload: {totalCount}
    } as const),
    toggleIsLoading: (isLoading: boolean) => ({
        type: 'USERS/TOGGLE_IS_LOADING',
        payload: {isLoading}
    } as const),
    toggleIsFollowingInProgress: (isProgress: boolean, userId: string) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        payload: {isProgress, userId}
    } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsLoading(true))
    dispatch(actions.setCurrentPage(page))

    const res = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsLoading(false))
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actions.setUsers(res.data.items))
        dispatch(actions.setTotalCount(res.data.totalCount))
    }
}

// TODO: move to helpers
const _followUnfollowFlow = async (dispatch: any, userId: string, apiMethod: (userId: string) => Promise<any>, actionCreator: (userId: string) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingInProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingInProgress(false, userId))
}

export const follow = (userId: string): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.onFollow)
}

export const unfollow = (userId: string): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.onUnfollow)
}

export default usersReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>