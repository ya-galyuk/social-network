import React, {FC} from 'react';
import LoginForm from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/reducer/auth-reducer";
import {Redirect} from "react-router";
import {getIsAuth} from "../../redux/selectors/auth-selectors";

const LoginPage: FC<PropsType> = (props) => {

    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: TLoginFormData): void => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </>
    );
};

export default LoginPage;

type PropsType = {}

export type TLoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
}