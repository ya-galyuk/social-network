import React from 'react';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducer/auth-reducer";
import {Redirect} from "react-router";
import {getIsAuth} from "../../redux/selectors/auth-selectors";

const LoginContainer = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
})


export default connect(mapStateToProps, {login})(LoginContainer);