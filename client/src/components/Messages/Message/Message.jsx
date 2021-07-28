import React from 'react';
import cls from './Message.module.css'

const Message = (props) => {
    const {link, text} = props.message

    return (
        <div className={cls.messages__item}>
            <img className={cls.messages__img} src={link} alt=""/>
            <div className={cls.messages__text}>{text}</div>
        </div>
    );
};

export default Message;