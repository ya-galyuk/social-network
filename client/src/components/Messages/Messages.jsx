import React from 'react';
import cls from './Messages.module.css'
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";

const Messages = (props) => {
    const dialogsElements = props.messagesPage.dialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)
    const messagesElements = props.messagesPage.messages.map(message => <Message message={message} key={message.id}/>)
    const newMessageBody = props.messagesPage.newMessageBody

    const onSendMessageClick = () => {
        props.sendMessage()
    }
    const onNewMessageChange = (e) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
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
            <div>
                <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder="Enter your message"/>
                <button onClick={onSendMessageClick}>Send</button>
            </div>
        </div>
    );
};

export default Messages;