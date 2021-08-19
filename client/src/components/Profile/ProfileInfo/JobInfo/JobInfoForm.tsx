import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {Form, Input, SubmitButton, Switch} from "formik-antd";
import {Formik, FormikHelpers} from "formik";
import {ProfileJobType} from "../../../../types/redux/ProfileTypes";

export const JobInfoForm: FC<PropsType> = (props) => {
    const {job} = props

    const dispatch = useDispatch()

    const onSubmit = (formData: IValues, {setSubmitting}: FormikHelpers<IValues>) => {
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                lookingForAJob: job.lookingForAJob,
                description: job.description,
            }}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Form.Item name="lookingForAJob" label="Looking for a job" valuePropName="checked">
                        <Switch name="lookingForAJob"/>
                    </Form.Item>
                    <Form.Item name="description">
                        <Input.TextArea name="description" autoSize allowClear/>
                    </Form.Item>
                    <Form.Item name={"submit"}>
                        <SubmitButton type={"primary"} disabled={isSubmitting}>Save</SubmitButton>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    );
}

type PropsType = {
    job: ProfileJobType
    isOwner: boolean
}

interface IValues extends ProfileJobType {
}