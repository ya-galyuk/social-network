import React, {FC} from 'react';
import cls from './Messages.module.css'
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import MessagesForm from "./MessagesForm";
import {InitialStateType} from "../../redux/reducer/dialogs-reducer";

const Messages: FC<PropsType> = (props) => {
    const {messagesPage, sendMessage} = props

    const dialogsElements = messagesPage.dialogs.map(dialog => <Dialog {...dialog} key={dialog.id}/>)
    const messagesElements = messagesPage.messages.map(message => <Message {...message} key={message.id}/>)

    const onSubmit = (formData: MessagesFormValuesType) => {
        sendMessage(formData.message)
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

type PropsType = {
    messagesPage: InitialStateType;
    sendMessage: (newMessage: string) => void
}

export type MessagesFormValuesType = {
    message: string;
}