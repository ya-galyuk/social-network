import React, {FC} from 'react';
import cls from './Post.module.css'

const Post: FC<PropsType> = (props) => {
    const {time, text} = props
    return (
        <div className={cls.post}>
            <span className={cls.post__time}>{time}</span>
            <p className={cls.post__text}>{text}</p>
        </div>
    );
};

export default Post;

type PropsType = {
    time: string
    text: string
}