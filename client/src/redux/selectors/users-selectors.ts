/*
* A selector is not recomputed unless one of its arguments changes.
* For this use reselect lib.
* */
/* import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((subtotal, item) => subtotal + item.value, 0)
)*/

import {AppStateType} from "../redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsLoading = (state: AppStateType) => {
    return state.usersPage.isLoading;
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}