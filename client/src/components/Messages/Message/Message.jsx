import React from 'react';
import cls from './Message.module.css'

const Message = (props) => {
    props = props.message

    return (
        <div className={cls.messages__item}>
            <img className={cls.messages__img} src={props.link} alt=""/>
            <div className={cls.messages__text}>{props.text}</div>
        </div>
    );
};

export default Message;