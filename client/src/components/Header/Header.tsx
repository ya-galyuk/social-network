import React, {FC} from 'react';
import cls from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png"

const Header: FC<PropsType> = (props) => {
    const {isAuth, login, logout} = props
    return (
        <header className={cls.header}>
            <img className={cls.header__logo} src={logo} alt=""/>
            <div className={cls.header__login}>
                {isAuth
                    ? <div className={cls.header__username}>
                        {login} – <button onClick={logout}>Log out</button></div>
                    : <NavLink className={cls.header__link} to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}