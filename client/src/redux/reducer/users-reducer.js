import usersAPI from "../../api/usersAPI";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 6,
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
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                }),
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                }),
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
export const toggleIsFollowingInProgress = (isProgress, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isProgress, userId})

export const getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    dispatch(setCurrentPage(currentPage))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsLoading(false))
            dispatch(setUsers(data.users.items))
            dispatch(setTotalCount(data.totalCount))
        })
}

export const follow = (userId) => (dispatch) => {
    dispatch(toggleIsFollowingInProgress(true, userId))
    return usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(onFollow(userId))
        }
        dispatch(toggleIsFollowingInProgress(false, userId))
    })
}

export const unfollow = (userId) => (dispatch) => {
    dispatch(toggleIsFollowingInProgress(true, userId))
    return usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(onUnfollow(userId))
        }
        dispatch(toggleIsFollowingInProgress(false, userId))
    })
}

export default usersReducer