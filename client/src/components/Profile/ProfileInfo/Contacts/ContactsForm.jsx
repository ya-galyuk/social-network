import React from 'react';
import cls from "./Contacts.module.css";
import clsProfile from "../ProfileInfo.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/FormsControls/Input";
import {v4 as uuidv4} from "uuid";

let ContactsForm = (props) => {
    const {handleSubmit, profile, submitting} = props

    const contactElements = Object.keys(profile.contacts).map(key =>
        <div className={cls.contacts__item} key={uuidv4()}>
            <span>{key}: </span>
            <Field component={Input} name={key} type="text" placeholder={key}/>
        </div>)

    return (
        <form className={clsProfile.contacts} onSubmit={handleSubmit}>
            <h3 className={clsProfile.contacts__title}>Contact Info</h3>
            {contactElements}
            <button className={clsProfile.btn__save} type="submit" disabled={submitting}>save</button>
        </form>
    );
};

ContactsForm = reduxForm({form: "edit-profile-contacts", destroyOnUnmount: false,})(ContactsForm);
export default ContactsForm