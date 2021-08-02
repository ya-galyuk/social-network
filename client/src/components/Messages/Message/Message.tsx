import React, {FC} from 'react';
import cls from './Message.module.css'

const Message: FC<PropsType> = (props) => {
    const {link, text} = props

    return (
        <div className={cls.messages__item}>
            <img className={cls.messages__img} src={link} alt=""/>
            <div className={cls.messages__text}>{text}</div>
        </div>
    );
};

export default Message;

type PropsType = {
    link: string
    text: string
}