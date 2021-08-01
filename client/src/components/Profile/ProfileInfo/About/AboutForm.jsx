import React from 'react';
import cls from "../ProfileInfo.module.css";
import {reduxForm} from "redux-form";
import {createField, Textarea} from "../../../common/FormsControls/FormControls";

const AboutForm = (props) => {
    const {handleSubmit} = props

    return (
        <form className={cls.about} onSubmit={handleSubmit}>
            <h3 className={cls.about__title}>About</h3>
            {createField("about", "text", Textarea, [], "Your text ...")}
            <button className={cls.btn__save}>save</button>
        </form>
    );
};

export default reduxForm({form: "edit-profile-about"})(AboutForm);