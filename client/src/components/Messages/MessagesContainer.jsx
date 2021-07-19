import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/reducer/dialogs-reducer";
import Messages from "./Messages";
import StoreContext from "../../StoreContext";

const MessagesContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().messagesPage

                    const onSendMessageClick = () => {
                        store.dispatch(sendMessageCreator())
                    }

                    const onNewMessageChange = (body) => {
                        store.dispatch(updateNewMessageBodyCreator(body))
                    }

                    return <Messages
                        dialogsPage={state}
                        sendMessage={onSendMessageClick}
                        updateNewMessageBodyCreator={onNewMessageChange}/>
                }
            }
        </StoreContext.Consumer>
    );
};

export default MessagesContainer;