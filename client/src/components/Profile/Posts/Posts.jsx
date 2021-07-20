import React from 'react';
import cls from './Posts.module.css'
import Post from "./Post/Post";

const Posts = (props) => {
    const newPostElement = React.createRef()

    const postsElements = props.posts.map(post => <Post post={post} key={post.id}/>)

    const onAddPost = () => {
        props.addPost()
    }

    const onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <>
            <h2>My posts</h2>
            <div className={cls.posts__inputs}>
                <textarea className={cls.posts__textarea} onChange={onPostChange} ref={newPostElement}
                          value={props.newPostText}/>
                <button className={cls.posts__btn} onClick={onAddPost}>Public</button>
            </div>
            {postsElements}
        </>
    );
};

export default Posts;