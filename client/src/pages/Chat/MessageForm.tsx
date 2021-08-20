import {useDispatch, useSelector} from "react-redux";
import {getStatus} from "../../redux/selectors/chat-selectors";
import {Formik, FormikHelpers} from "formik";
import {sendMessages} from "../../redux/reducer/chat-reducer";
import {Form, Input, SubmitButton} from "formik-antd";
import {EStatus} from "../../api/chat-api";
import React from "react";

interface IValues {
    message: string
}

export const MessageForm = () => {
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    const onSubmit = (formData: IValues, {setSubmitting, resetForm}: FormikHelpers<IValues>) => {
        if (formData.message) {
            dispatch(sendMessages(formData.message))
        }
        setSubmitting(false)
        resetForm()
    }

    return (
        <Formik
            initialValues={{message: '',}}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form name="basicForm" layout="inline">
                    <Form.Item name="message">
                        <Input name="message"/>
                    </Form.Item>
                    <Form.Item name={"submit"}>
                        <SubmitButton htmlType="submit" type="primary"
                                      disabled={status !== EStatus.ready && isSubmitting}>Submit</SubmitButton>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    );
};