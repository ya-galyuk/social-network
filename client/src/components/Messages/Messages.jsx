import React from 'react';
import cls from './Messages.module.css'
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";

const Messages = (props) => {
    const dialogsElements = props.state.dialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)
    const messagesElements = props.state.messages.map(message => <Message message={message} key={message.id}/>)

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
        </div>
    );
};

export default Messages;