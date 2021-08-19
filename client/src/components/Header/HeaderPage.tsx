import React, {FC} from 'react';
import cls from './Header.module.css';
import logo from "../../assets/images/logo.png"
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getLogin} from "../../redux/selectors/auth-selectors";
import {logout} from "../../redux/reducer/auth-reducer";
import {Layout} from "antd";
import {MenuContainer} from "./MenuContainer/MenuContainer";
import classNames from "classnames";

const {Header} = Layout;

export const HeaderPage: FC<PropsType> = (props) => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <Header>
            <div className={classNames(cls.header, "container")}>
                <div className={cls.header__logo}>
                    <img className={cls.header__img} src={logo} alt=""/>
                </div>
                <MenuContainer isAuth={isAuth} login={login} onLogout={onLogout}/>
            </div>
        </Header>
    );
};

type PropsType = {}