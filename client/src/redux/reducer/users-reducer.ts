import usersAPI from "../../api/usersAPI";
import {updateObjectInArray} from "../../utils/helpers/object-helper";
import {
    InitialStateType,
    OnFollowActionType,
    OnUnfollowActionType,
    SetCurrentPageActionType, SetTotalCountActionType,
    SetUsersActionType, ToggleIsFollowingInProgressActionType, ToggleIsLoadingActionType, UsersType
} from "../../types/UsersTypes";

export const FOLLOW = 'users/FOLLOW';
export const UNFOLLOW = 'users/UNFOLLOW';
export const SET_USERS = 'users/SET_USERS';
export const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
export const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
export const TOGGLE_IS_LOADING = 'users/TOGGLE_IS_LOADING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState: InitialStateType = {
    users: [],
    pageSize: 3,
    totalCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
}

const usersReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
        case SET_CURRENT_PAGE:
        case SET_TOTAL_COUNT:
        case TOGGLE_IS_LOADING: {
            return {...state, ...action.payload};
        }
        case FOLLOW : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
            };
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, payload: {users}})
export const onFollow = (userId: string): OnFollowActionType => ({type: FOLLOW, payload: {userId}})
export const onUnfollow = (userId: string): OnUnfollowActionType => ({type: UNFOLLOW, payload: {userId}})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    payload: {currentPage}
})
export const setTotalCount = (totalCount: number): SetTotalCountActionType => ({
    type: SET_TOTAL_COUNT,
    payload: {totalCount}
})
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({
    type: TOGGLE_IS_LOADING,
    payload: {isLoading}
})
export const toggleIsFollowingInProgress = (isProgress: boolean, userId: string): ToggleIsFollowingInProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    payload: {isProgress, userId}
})

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsLoading(true))
    dispatch(setCurrentPage(page))

    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsLoading(false))
    dispatch(setUsers(data.users.items))
    dispatch(setTotalCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userId: string, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingInProgress(true, userId))
    const data = await apiMethod(userId)
    if (!data.resultCode) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingInProgress(false, userId))
}

export const follow = (userId: string) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), onFollow)
}

export const unfollow = (userId: string) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), onUnfollow)
}

export default usersReducer