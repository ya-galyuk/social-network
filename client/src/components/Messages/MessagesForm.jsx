import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormControls";
import {maxLength15} from "../../utils/validators";

let MessagesForm = (props) => {
    const {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField("message", "text", Textarea, [maxLength15], "Enter your message")}
            </div>
            <button>Send</button>
        </form>
    );
};

export default reduxForm({form: 'messages'})(MessagesForm);