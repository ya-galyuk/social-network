import React from 'react';
import cls from './Messages.module.css'
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import MessagesForm from "./MessagesForm";

const Messages = (props) => {
    const dialogsElements = props.messagesPage.dialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)
    const messagesElements = props.messagesPage.messages.map(message => <Message message={message} key={message.id}/>)

    const onSubmit = (formData) => {
        props.sendMessage(formData.message)
    }

    return (
        <div className={cls.dialogs}>
            <div>
                <ul className={cls.dialogs__list}>
                    {dialogsElements}
                </ul>
            </div>
            <div className={cls.messages}>
                {messagesElements}
            </div>
            <MessagesForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Messages;