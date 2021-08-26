import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import cls from '../Auth.module.css'
import {Form, Input, SubmitButton} from "formik-antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {gql, useMutation} from "@apollo/client";
import {transformGraphQLErrors} from "../../../utils/helpers/error-helpers";
import {useHistory} from "react-router";
import {login as loginThunk} from "../../../redux/reducer/auth-reducer";
import {useDispatch} from "react-redux";

interface IValues {
    email: string;
    password: string;
    remember: boolean;
}

export const LoginForm: FC<PropsType> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            // TODO delete after remove isAuth state
            dispatch(loginThunk(userData.user))
            history.push("/profile");
        },
        onCompleted({login}) {
            if (login) {
                localStorage.setItem('accessToken', login.tokens.accessToken);
                localStorage.setItem('refreshToken', login.tokens.refreshToken);
            }
        }
    });

    const onSubmit = async (values: IValues, {setErrors, setFieldValue}: FormikHelpers<IValues>) => {
        try {
            await login({variables: {loginInput: values}})
        } catch (err) {
            const errors = transformGraphQLErrors(err)
            await setFieldValue('password', '')
            setErrors(errors)
        }
    }

    return (
        <div className={cls.auth__form}>
            <div className={cls.auth__header}>
                <h1>Sign in</h1>
                <span>New to SN? <NavLink to="/register">Create an account</NavLink></span>
            </div>
            <Formik
                enableReinitialize
                initialValues={{email: '', password: '', remember: true,}}
                validationSchema={LoginValidationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Form.Item name="email">
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               type={"email"} name={"email"} placeholder="Email address"/>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                               suffix={<a href="">Forgot password?</a>}
                               type="password" name={"password"} placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="submit">
                        <SubmitButton type="primary" block htmlType="submit" loading={loading}>
                            Sign in
                        </SubmitButton>
                    </Form.Item>
                </Form>
            </Formik>
        </div>
    );
};

type PropsType = {}

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required(''),
    password: Yup.string().required(''),
});

const LOGIN_USER = gql`
    mutation LoginUser($loginInput: LoginInput){
        login(loginInput:$loginInput){
            user {
                id
                email
            }
            tokens {
                accessToken
                refreshToken
            }
        }
    }
`
