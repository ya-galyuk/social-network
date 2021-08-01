import React from 'react';
import cls from "./Posts.module.css";
import {reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormControls";

const PostForm = (props) => {
    const {handleSubmit} = props
    return (
        <form className={cls.posts__form} onSubmit={handleSubmit}>
            <div>
                {createField("postMessage", "text", Textarea, [], "Post message", {className: cls.posts__textarea})}
            </div>
            <button className={cls.posts__btn}>Public</button>
        </form>
    );
};

export default reduxForm({form: 'post'})(PostForm);