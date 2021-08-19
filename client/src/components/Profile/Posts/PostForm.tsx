import React, {FC} from 'react';
import {Form, Input, SubmitButton} from "formik-antd";
import {Formik, FormikHelpers} from "formik";
import {actions} from "../../../redux/reducer/profile-reducer";
import {useDispatch} from "react-redux";

interface IValues {
    text: string;
}

export const PostForm: FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const onSubmit = (formData: IValues, {setSubmitting, resetForm}: FormikHelpers<IValues>) => {
        dispatch(actions.addPost(formData.text))
        setSubmitting(false)
        resetForm()
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{text: ''}}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Form.Item name={"text"}>
                        <Input.TextArea name={"text"} placeholder="Post message ..." autoSize allowClear/>
                    </Form.Item>
                    <Form.Item name={"submit"}>
                        <SubmitButton type={"primary"} disabled={isSubmitting}>Public</SubmitButton>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    )
};

type PropsType = {}