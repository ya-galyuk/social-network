export const getProfile = state => {
    return state.profilePage.profile;
}

export const getStatus = state => {
    return state.profilePage.status;
}

export const getPosts = state => {
    return state.profilePage.posts;
}

export const getNewPostText = state => {
    return state.profilePage.newPostText;
}