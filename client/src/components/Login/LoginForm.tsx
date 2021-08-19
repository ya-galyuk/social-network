import React, {FC} from 'react';
import cls from './Login.module.css'
import {Checkbox, Form, Input, SubmitButton} from "formik-antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Formik, FormikHelpers} from "formik";
import {login} from "../../redux/reducer/auth-reducer";
import {useDispatch} from "react-redux";
import * as Yup from 'yup';

interface IValues {
    email: string;
    password: string;
    remember: boolean;
}

export const LoginForm: FC<PropsType> = (props) => {
    const dispatch = useDispatch()

    const LoginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const onSubmit = (values: IValues, {setSubmitting}: FormikHelpers<IValues>) => {
        dispatch(login(values.email, values.password, values.remember))
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                email: '',
                password: '',
                remember: true,
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form className={cls.login__form}>
                    <Form.Item name="email">
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                               name={"email"}/>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                               placeholder="Password" name={"password"}/>
                    </Form.Item>
                    <Form.Item name="remember">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox name={"remember"}>Remember me</Checkbox>
                        </Form.Item>

                        <a className={cls.login__forgot} href="">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item name="submit">
                        <SubmitButton type="primary" block htmlType="submit" disabled={isSubmitting}>
                            Log in
                        </SubmitButton>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    );
};

type PropsType = {}
