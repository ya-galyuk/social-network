import React, {FC} from 'react';
import {LoginForm} from "./LoginForm";
import {useSelector} from "react-redux";
import {Redirect} from "react-router";
import {getIsAuth} from "../../redux/selectors/auth-selectors";

const LoginPage: FC<PropsType> = (props) => {

    const isAuth = useSelector(getIsAuth)

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (<LoginForm/>);
};

export default LoginPage;

type PropsType = {}
