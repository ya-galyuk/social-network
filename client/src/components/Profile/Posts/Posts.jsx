import React from 'react';
import cls from './Posts.module.css'
import Post from "./Post/Post";

const Posts = (props) => {
    const propsElements = props.posts.map(post => <Post post={post} key={post.id}/>)

    return (
        <>
            <h2>My posts</h2>
            <div className={cls.posts__inputs}>
                <textarea className={cls.posts__textarea}/>
                <button className={cls.posts__btn}>Public</button>
            </div>
            {propsElements}
        </>
    );
};

export default Posts;