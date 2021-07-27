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

export const getUsers = state => {
    return state.usersPage.users;
}
export const getPageSize = state => {
    return state.usersPage.pageSize;
}
export const getTotalCount = state => {
    return state.usersPage.totalCount;
}
export const getCurrentPage = state => {
    return state.usersPage.currentPage;
}
export const getIsLoading = state => {
    return state.usersPage.isLoading;
}
export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress;
}