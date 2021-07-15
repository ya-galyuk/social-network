import React from 'react';
import cls from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={cls.menu}>
            <ul className={cls.menu__list}>
                <li><a className={cls.menu__link} href="/profile">Profile</a></li>
                <li><a className={cls.menu__link} href="/messages">Messages</a></li>
                <li><a className={cls.menu__link} href="/news">News</a></li>
                <li><a className={cls.menu__link} href="/music">Music</a></li>
                <li><a className={cls.menu__link} href="/settings">Settings</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;