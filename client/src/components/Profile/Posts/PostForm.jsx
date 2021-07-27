import React from 'react';
import cls from "./Posts.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/Input";

const PostForm = (props) => {
    const {handleSubmit} = props
    return (
        <form className={cls.posts__form} onSubmit={handleSubmit}>
            <div>
                <Field className={cls.posts__textarea} name={"postMessage"} component={Textarea}
                       placeholder={"Post message"}/>
            </div>
            <button className={cls.posts__btn}>Public</button>
        </form>
    );
};

export default reduxForm({form: 'post'})(PostForm);