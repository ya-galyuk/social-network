import React from 'react';
import cls from "../ProfileInfo.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/Input";

const AboutForm = (props) => {
    const {handleSubmit} = props

    return (
        <form className={cls.about} onSubmit={handleSubmit}>
            <h3 className={cls.about__title}>About</h3>
            <Field component={Textarea} name={"about"} type={"text"} placeholder={"Your text ..."}/>
            <button className={cls.btn__save}>save</button>
        </form>
    );
};

export default reduxForm({form: "edit-profile-about"})(AboutForm);