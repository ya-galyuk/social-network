import React, {FC} from 'react';
import cls from './Login.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLength15, required} from "../../utils/validators";
import {createField, Input} from "../common/FormsControls/FormControls";
import {TLoginFormData} from "./LoginContainer";

let LoginForm: FC<InjectedFormProps<TLoginFormData>> = (props) => {
    const {handleSubmit, error} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<TLoginFormKeys>("email", "text", Input, [required, maxLength15], "Enter your login")}
            </div>
            <div>
                {createField<TLoginFormKeys>("password", "password", Input, [required], "Password")}
            </div>
            <div>
                {createField<TLoginFormKeys>("rememberMe", "checkbox", Input, [], undefined)}
                <label htmlFor="rememberMe"> remember me</label>
            </div>
            {error && <div className={cls.error}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export default reduxForm<TLoginFormData>({form: 'login'})(LoginForm);

export type TLoginFormKeys = Extract<keyof TLoginFormData, string>