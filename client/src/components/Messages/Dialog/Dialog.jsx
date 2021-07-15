import React from 'react';
import cls from './Dialog.module.css'
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    props = props.dialog
    const path = `/messages/${props.id}`
    
    return (
        <li className={`${cls.dialog__item} ${cls.active}`}>
            <NavLink to={path}>{props.username}</NavLink>
        </li>
    );
};

export default Dialog;