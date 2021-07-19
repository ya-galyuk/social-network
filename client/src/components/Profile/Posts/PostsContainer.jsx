import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/reducer/profile-reducer";
import Posts from "./Posts";
import StoreContext from "../../../StoreContext";

const PostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState()

                    const addPost = () => {
                        const action = addPostCreator()
                        store.dispatch(action)
                    }

                    const onPostChange = (text) => {
                        const action = updateNewPostTextCreator(text)
                        store.dispatch(action)
                    }

                    return < Posts
                        posts={state.profilePage.posts}
                        newPostText={state.profilePage.newPostText}
                        addPost={addPost}
                        updateNewPostTextCreator={onPostChange}
                    />
                }
            }
        </StoreContext.Consumer>
    );
};

export default PostsContainer;