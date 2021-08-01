import usersAPI from "../../api/usersAPI";
import {updateObjectInArray} from "../../utils/helpers/object-helper";
import {UserType} from "../../types/redux/UsersTypes";
import {ResultCodes} from "../../enums";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionType} from "../redux-store";

type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalCount: number,
    currentPage: number,
    isLoading: boolean,
    followingInProgress: Array<string> // array of users ids
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 3,
    totalCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
}

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USERS":
        case "SET_CURRENT_PAGE":
        case "SET_TOTAL_COUNT":
        case "TOGGLE_IS_LOADING": {
            return {...state, ...action.payload};
        }
        case "FOLLOW" : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            };
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
            };
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
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

type ActionsTypes = InferActionType<typeof actions>

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', payload: {users}} as const),
    onFollow: (userId: string) => ({type: 'FOLLOW', payload: {userId}} as const),
    onUnfollow: (userId: string) => ({type: 'UNFOLLOW', payload: {userId}} as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        payload: {currentPage}
    } as const),
    setTotalCount: (totalCount: number) => ({
        type: 'SET_TOTAL_COUNT',
        payload: {totalCount}
    } as const),
    toggleIsLoading: (isLoading: boolean) => ({
        type: 'TOGGLE_IS_LOADING',
        payload: {isLoading}
    } as const),
    toggleIsFollowingInProgress: (isProgress: boolean, userId: string) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        payload: {isProgress, userId}
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

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