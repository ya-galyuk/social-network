import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/reducer/profile-reducer";
import Posts from "./Posts";

const PostsContainer = (props) => {
    let state = props.store.getState()

    const addPost = () => {
        const action = addPostCreator()
        props.store.dispatch(action)
    }

    const onPostChange = (text) => {
        const action = updateNewPostTextCreator(text)
        props.store.dispatch(action)
    }

    return (<Posts posts={state.profilePage.posts}
                   newPostText={state.profilePage.newPostText}
                   addPost={addPost}
                   updateNewPostTextCreator={onPostChange}/>);
};

export default PostsContainer;