import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/Input";
import {maxLength15} from "../../utils/validators";

let MessagesForm = (props) => {
    let {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name={"message"} component={Textarea} placeholder="Enter your message"
                validate={[maxLength15]}/>
            </div>
            <button>Send</button>
        </form>
    );
};

export default reduxForm({form: 'messages'})(MessagesForm);