import React, {FC} from 'react';
import cls from "../ProfileInfo.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../../common/FormsControls/FormControls";
import {TAboutFormData} from "./AboutContainer";

const AboutForm:FC<InjectedFormProps<TAboutFormData>> = (props) => {
    const {handleSubmit} = props

    return (
        <form className={cls.about} onSubmit={handleSubmit}>
            <h3 className={cls.about__title}>About</h3>
            {createField<TAboutFormKeys>("about", "text", Textarea, [], "Your text ...")}
            <button className={cls.btn__save}>save</button>
        </form>
    );
};

export default reduxForm<TAboutFormData>({form: "edit-profile-about"})(AboutForm);

export type TAboutFormKeys = Extract<keyof TAboutFormData, string>