import React from 'react';
import cls from './Messages.module.css'
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/reducer/dialogs-reducer";

const Messages = (props) => {
    const dialogsElements = props.state.dialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)
    const messagesElements = props.state.messages.map(message => <Message message={message} key={message.id}/>)
    const newMessageBody = props.state.newMessageBody

    const onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (e) => {
        let body = e.target.value
        props.dispatch(updateNewMessageBodyCreator(body))
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