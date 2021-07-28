import React from 'react';
import cls from './Post.module.css'

const Post = (props) => {
    const {time, text} = props.post
    return (
        <div className={cls.post}>
            <span className={cls.post__time}>{time}</span>
            <p className={cls.post__text}>{text}</p>
        </div>
    );
};

export default Post;