import React, {FC, useEffect, useState} from 'react';
import cls from './Header.module.css';
import logo from "../../assets/images/logo.png"
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getLogin} from "../../redux/selectors/auth-selectors";
import {logout as logoutThunk} from "../../redux/reducer/auth-reducer";
import {Layout} from "antd";
import {MenuContainer} from "./MenuContainer/MenuContainer";
import classNames from "classnames";
import {useHistory} from "react-router";
import {gql, useMutation} from "@apollo/client";

const {Header} = Layout;

export const HeaderPage: FC<PropsType> = React.memo((props) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const isAuth = useSelector(getIsAuth)
    const authUser = useSelector(getLogin)

    const [login, setLogin] = useState<string | null>(null)

    const [logout] = useMutation(LOGOUT_USER_MUTATION, {
        onCompleted: () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    });

    useEffect(() => {
        setLogin(authUser || null)
    }, [authUser])

    const onLogout = async () => {
        await logout({variables: {refreshToken: localStorage.getItem('refreshToken') || ''}})
        await dispatch(logoutThunk())
        history.push('/login')
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
});

type PropsType = {}

const LOGOUT_USER_MUTATION = gql`
    mutation Mutation($refreshToken: String!) {
        logout(refreshToken: $refreshToken)
    }
`;
