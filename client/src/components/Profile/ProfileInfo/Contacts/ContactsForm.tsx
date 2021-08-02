import React, {FC} from 'react';
import cls from "./Contacts.module.css";
import clsProfile from "../ProfileInfo.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../../common/FormsControls/FormControls";
import {v4 as uuidv4} from "uuid";
import {TContactsFormData} from "./ContactsContainer";
import {ProfileContactsType} from "../../../../types/redux/ProfileTypes";

let ContactsForm: FC<InjectedFormProps<TContactsFormData, OwnPropsType> & OwnPropsType> = (props) => {
    const {handleSubmit, contacts, submitting} = props

    const contactElements = Object.keys(contacts).map(key =>
        <div className={cls.contacts__item} key={uuidv4()}>
            <span>{key}: </span>
            {createField<TContactsFormKeys>(key as keyof ProfileContactsType, "text", Input, [], key)}
        </div>)

    return (
        <form className={clsProfile.contacts} onSubmit={handleSubmit}>
            <h3 className={clsProfile.contacts__title}>Contact Info</h3>
            {contactElements}
            <button className={clsProfile.btn__save} type="submit" disabled={submitting}>save</button>
        </form>
    );
};

export default reduxForm<TContactsFormData, OwnPropsType>({
    form: "edit-profile-contacts",
    destroyOnUnmount: false,
})(ContactsForm);

type OwnPropsType = {
    contacts: ProfileContactsType
}

export type TContactsFormKeys = Extract<keyof TContactsFormData, string>