import React from 'react';
import cls from './Header.module.css';

const Header = () => {
    return (
        <header className={cls.header}>
            <img className={cls.header__logo} src="../../../public/logo.png" alt=""/>
        </header>
    );
};

export default Header;