import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import cls from '../Auth.module.css'
import {Form, Input, SubmitButton} from "formik-antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import {gql, useMutation} from "@apollo/client";
import {transformGraphQLErrors} from "../../../utils/helpers/error-helpers";
import {useHistory} from "react-router";
import {register as registerThunk} from "../../../redux/reducer/auth-reducer";
import {useDispatch} from "react-redux";

interface IValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterForm: FC<PropsType> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [register, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}) {
            dispatch(registerThunk(userData.user))
            history.push("/profile");
        },
        onCompleted({register}) {
            if (register) {
                localStorage.setItem('accessToken', register.tokens.accessToken);
                localStorage.setItem('refreshToken', register.tokens.refreshToken);
            }
        }
    });

    const onSubmit = async (values: IValues, {setErrors, setFieldValue}: FormikHelpers<IValues>) => {
        try {
            await register({variables: {registerInput: values}})
        } catch (err) {
            const errors = transformGraphQLErrors(err)
            await setFieldValue('password', '')
            await setFieldValue('confirmPassword', '')
            setErrors(errors)
        }
    }

    return (
        <div className={cls.auth__form}>
            <div className={cls.auth__header}>
                <h1 className={cls.auth__title}>Sign up</h1>
                <span className={cls.auth__helper}><NavLink to="/login">Sign in.</NavLink></span>
            </div>
            <Formik
                enableReinitialize
                initialValues={{email: '', password: '', confirmPassword: '',}}
                validationSchema={RegisterValidationSchema}
                onSubmit={onSubmit}
            >
                <Form className={cls.auth__form}>
                    <Form.Item name="email" className={cls.auth__item}>
                        <Input prefix={<UserOutlined className={cls.auth__icon_prefix}/>}
                               type={"email"} name={"email"} placeholder="Email address"/>
                    </Form.Item>
                    <Form.Item name="password" className={cls.auth__item}>
                        <Input.Password prefix={<LockOutlined className={cls.auth__icon_prefix}/>}
                                        type="password" name={"password"} placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="confirmPassword" className={cls.auth__item}>
                        <Input.Password prefix={<LockOutlined className={cls.auth__icon_prefix}/>}
                                        type="password" name={"confirmPassword"} placeholder="Confirm password"/>
                    </Form.Item>
                    <Form.Item name="submit" className={cls.auth__item}>
                        <SubmitButton type="primary" block htmlType="submit" loading={loading}>
                            Create account
                        </SubmitButton>
                    </Form.Item>
                </Form>
            </Formik>
        </div>
    );
};

type PropsType = {}

const RegisterValidationSchema = yup.object().shape({
    email: yup.string().email().required(''),
    password: yup.string().required(''),
    confirmPassword: yup.string().test('match', 'password do not match',
        function (confirmPassword) {
            return confirmPassword === this.parent.password;
        }).required(''),
});

const REGISTER_USER = gql`
    mutation RegisterUser($registerInput: RegisterInput) {
        register(registerInput: $registerInput) {
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
