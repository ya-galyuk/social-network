import React from 'react';
import cls from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={cls.header}>
            <img className={cls.header__logo} src="../../../public/logo.png" alt=""/>

            <div className={cls.header__login}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;