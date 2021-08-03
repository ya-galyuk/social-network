import React, {FC} from 'react';
import cls from './Dialog.module.css'
import {NavLink} from "react-router-dom";

const Dialog: FC<PropsType> = (props) => {
    const {id, username} = props
    const path = `/messages/${id}`

    return (
        <li className={`${cls.dialog__item} ${cls.active}`}>
            <NavLink to={path}>{username}</NavLink>
        </li>
    );
};

export default Dialog;

type PropsType = {
    id: string
    username: string
}