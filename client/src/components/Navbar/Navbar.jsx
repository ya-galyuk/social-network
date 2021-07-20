import React from 'react';
import cls from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={cls.menu}>
            <ul className={cls.menu__list}>
                <li><NavLink className={cls.menu__link} activeClassName={cls.active} to="/profile">Profile</NavLink></li>
                <li><NavLink className={cls.menu__link} activeClassName={cls.active} to="/messages">Messages</NavLink></li>
                <li><NavLink className={cls.menu__link} activeClassName={cls.active} to="/news">News</NavLink></li>
                <li><NavLink className={cls.menu__link} activeClassName={cls.active} to="/music">Music</NavLink></li>
                <li><NavLink className={cls.menu__link} activeClassName={cls.active} to="/users">Users</NavLink></li>
                <li><NavLink className={cls.menu__link} activeClassName={cls.active} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;