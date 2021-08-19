import React, {FC} from 'react';
import cls from "./Contacts.module.css";
import {IProfileContacts} from "../../../../types/redux/ProfileTypes";
import {useDispatch} from "react-redux";
import {Formik, FormikHelpers} from "formik";
import {saveProfileContacts} from "../../../../redux/reducer/profile-reducer";
import {Form, Input, SubmitButton} from "formik-antd";
import {Button} from "antd";

export const ContactsForm: FC<PropsType> = (props) => {
    const {contacts, setEditMode} = props

    const dispatch = useDispatch()

    const onSubmit = (formData: IValues, {setSubmitting}: FormikHelpers<IValues>) => {
        dispatch(saveProfileContacts({...formData}))
        setSubmitting(false)
    }

    const onCancel = () => {
        setEditMode(false)
    }

    const contactElements = Object.keys(contacts).map(key =>
        <Form.Item name={key} label={key} key={key}>
            <Input name={key} placeholder={key}/>
        </Form.Item>)

    return (
        <Formik
            enableReinitialize
            initialValues={{
                Email: contacts.Email,
                Telegram: contacts.Telegram,
                GitHub: contacts.GitHub,
                YouTube: contacts.YouTube,
                LinkedIn: contacts.LinkedIn,
                WebSite: contacts.WebSite
            }}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form {...layout}>
                    {contactElements}
                    <Form.Item name={"submitOrCancel"} {...tailLayout}>
                        <SubmitButton type={"primary"} disabled={isSubmitting}>Save</SubmitButton>
                        <Button className={cls.form__btnCancel} onClick={onCancel}>Cancel</Button>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    )
};

type PropsType = {
    contacts: IProfileContacts
    setEditMode: (editMode: boolean) => void
}

interface IValues extends IProfileContacts {
}

const layout = {
    labelCol: {span: 3},
    wrapperCol: {span: 21},
}

const tailLayout = {
    wrapperCol: {offset: 3, span: 21},
}
