import React from 'react';
import cls from './Preloader.module.css'
import preloader from "../../../assets/images/preloader.svg";

const Preloader = () => {
    return (
        <div className={cls.preloader}>
            <img src={preloader} alt=""/>
        </div>
    );
};

export default Preloader;