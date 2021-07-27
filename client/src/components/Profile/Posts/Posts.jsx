import React from 'react';
import cls from './Posts.module.css'
import Post from "./Post/Post";
import PostForm from "./PostForm";

const Posts = React.memo((props) => {
    const postsElements = props.posts.map(post => <Post post={post} key={post.id}/>)

    const onSubmit = (formData) => {
        props.addPost(formData.postMessage)
    }

    return (
        <div className={cls.posts}>
            <h2 className={cls.posts__title}>My posts</h2>
            <PostForm onSubmit={onSubmit}/>
            {postsElements}
        </div>
    );
});

export default Posts;