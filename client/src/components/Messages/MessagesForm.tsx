import React, {FC} from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormControls";
import {maxLength15} from "../../utils/validators";
import {MessagesFormValuesType} from "./Messages";

export type MessagesFormKeysType = Extract<keyof MessagesFormValuesType, string>

let MessagesForm:FC<InjectedFormProps<MessagesFormValuesType>> = (props) => {
    const {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<MessagesFormKeysType>("message", "text", Textarea, [maxLength15], "Enter your message")}
            </div>
            <button>Send</button>
        </form>
    );
};

export default reduxForm<MessagesFormValuesType>({form: 'messages'})(MessagesForm);