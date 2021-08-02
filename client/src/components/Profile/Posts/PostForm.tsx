import React, {FC} from 'react';
import cls from "./Posts.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormControls";
import {TPostFormData} from "./Posts";

const PostForm: FC<InjectedFormProps<TPostFormData>> = (props) => {
    const {handleSubmit} = props
    return (
        <form className={cls.posts__form} onSubmit={handleSubmit}>
            <div>
                {createField<TPostFormKeys>("text", "text", Textarea, [], "Post message", {className: cls.posts__textarea})}
            </div>
            <button className={cls.posts__btn}>Public</button>
        </form>
    );
};

export default reduxForm<TPostFormData>({form: 'post'})(PostForm);

export type TPostFormKeys = Extract<keyof TPostFormData, string>