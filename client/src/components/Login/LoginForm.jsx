import React from 'react';
// import cls from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {maxLength15, required} from "../../utils/validators";
import Input from "../common/FormsControls/Input";

let LoginForm = (props) => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Input} name={"login"} placeholder={"Login"}
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field component={Input} name={"password"} placeholder={"Password"}
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/>
                <label htmlFor="rememberMe"> remember me</label>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export default reduxForm({form: 'login'})(LoginForm);