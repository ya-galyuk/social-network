import usersAPI from "../../api/usersAPI";
import {updateObjectInArray} from "../../utils/helpers/object-helper";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
const TOGGLE_IS_LOADING = 'users/TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 3,
    totalCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS : {
            return {...state, users: action.users,};
        }
        case FOLLOW : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalCount: action.totalCount}
        }
        case TOGGLE_IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default: {
            return state;
        }
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})
export const onFollow = (userId) => ({type: FOLLOW, userId})
export const onUnfollow = (userId) => ({type: UNFOLLOW, userId})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const toggleIsFollowingInProgress = (isProgress, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isProgress,
    userId
})

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsLoading(true))
    dispatch(setCurrentPage(page))

    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsLoading(false))
    dispatch(setUsers(data.users.items))
    dispatch(setTotalCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingInProgress(true, userId))
    const data = await apiMethod(userId)
    if (!data.resultCode) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingInProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), onFollow)
}

export const unfollow = (userId) => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), onUnfollow)
}

export default usersReducer