import React from 'react';
import cls from './Post.module.css'

const Post = (props) => {
    return (
        <div className={cls.post}>
            <span className={cls.post__time}>{props.time}</span>
            <span className={cls.post__text}>{props.text}</span>
        </div>
    );
};

export default Post;