import React from 'react';
import cls from './Posts.module.css'
import Post from "./Post/Post";
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/reducer/profile-reducer";

const Posts = (props) => {
    const newPostElement = React.createRef()

    const propsElements = props.state.posts.map(post => <Post post={post} key={post.id}/>)

    const addPost = () => {
        const action = addPostCreator()
        props.dispatch(action)
    }

    const onPostChange = () => {
        let text = newPostElement.current.value
        const action = updateNewPostTextCreator(text)
        props.dispatch(action)
    }

    return (
        <>
            <h2>My posts</h2>
            <div className={cls.posts__inputs}>
                <textarea className={cls.posts__textarea} onChange={onPostChange} ref={newPostElement}
                          value={props.state.newPostText}/>
                <button className={cls.posts__btn} onClick={addPost}>Public</button>
            </div>
            {propsElements}
        </>
    );
};

export default Posts;