import React, {FC} from 'react';
import cls from './Login.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLength15, required} from "../../utils/validators";
import {createField, Input} from "../common/FormsControls/FormControls";
import {LoginFormValuesType} from "./LoginContainer";

export type LoginFormKeysType = Extract<keyof LoginFormValuesType, string>

let LoginForm: FC<InjectedFormProps<LoginFormValuesType>> = (props) => {
    const {handleSubmit, error} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<LoginFormKeysType>("email", "text", Input, [required, maxLength15], "Enter your login")}
            </div>
            <div>
                {createField<LoginFormKeysType>("password", "password", Input, [required], "Password")}
            </div>
            <div>
                {createField<LoginFormKeysType>("rememberMe", "checkbox", Input, [], undefined)}
                <label htmlFor="rememberMe"> remember me</label>
            </div>
            {error && <div className={cls.error}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export default reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm);