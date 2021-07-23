import React from 'react';
import cls from './Post.module.css'

const Post = (props) => {
    props = props.post
    return (
        <div className={cls.post}>
            <span className={cls.post__time}>{props.time}</span>
            <p className={cls.post__text}>{props.text}</p>
        </div>
    );
};

export default Post;