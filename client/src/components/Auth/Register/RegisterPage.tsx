import React, {FC} from 'react';
import {RegisterForm} from "./RegisterForm";
import {useSelector} from "react-redux";
import {Redirect} from "react-router";
import {getIsAuth} from "../../../redux/selectors/auth-selectors";

const LoginPage: FC<PropsType> = (props) => {

    const isAuth = useSelector(getIsAuth)

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (<RegisterForm/>);
};

export default LoginPage;

type PropsType = {}
