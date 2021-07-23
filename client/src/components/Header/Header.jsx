import React from 'react';
import cls from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png"

const Header = (props) => {
    return (
        <header className={cls.header}>
            <img className={cls.header__logo} src={logo} alt=""/>

            <div className={cls.header__login}>
                {props.isAuth
                    ? <span className={cls.header__username}>{props.login}</span>
                    : <NavLink className={cls.header__link} to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;