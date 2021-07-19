import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/reducer/dialogs-reducer";
import Messages from "./Messages";

const MessagesContainer = (props) => {
    let state = props.store.getState().messagesPage

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    const onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <Messages
            dialogsPage={state}
            sendMessage={onSendMessageClick}
            updateNewMessageBodyCreator={onNewMessageChange}/>
    );
};

export default MessagesContainer;