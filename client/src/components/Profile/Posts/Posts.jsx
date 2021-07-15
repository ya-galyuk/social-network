import React from 'react';
import cls from './Posts.module.css'
import Post from "./Post/Post";

const Posts = () => {
    const posts = [
        {
            id: '1',
            time: 'time-1',
            text: 'post text 1',
        },
        {
            id: '2',
            time: 'time-2',
            text: 'Post text 2',
        },
    ]

    return (
        <>
            {posts.map(post =>
                <Post {...post} key={post.id}/>
            )}
        </>
    );
};

export default Posts;