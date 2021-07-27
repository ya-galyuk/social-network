import React from 'react';
import LoginForm from "./LoginForm";

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </>
    );
};


export default Login;