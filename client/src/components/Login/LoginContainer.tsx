import React, {FC} from 'react';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducer/auth-reducer";
import {Redirect} from "react-router";
import {getIsAuth} from "../../redux/selectors/auth-selectors";
import {AppStateType} from "../../redux/redux-store";

const LoginContainer: FC<PropsType> = (props) => {
    const {isAuth, login} = props

    const onSubmit = (formData: TLoginFormData): void => {
        login(formData.email, formData.password, formData.rememberMe)
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: getIsAuth(state),
})


export default connect(mapStateToProps, {login})(LoginContainer);


type PropsType = {
    isAuth: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
}

type MapStatePropsType = {
    isAuth: boolean;
}

export type TLoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
}