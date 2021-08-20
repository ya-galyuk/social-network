import {useDispatch, useSelector} from "react-redux";
import {getStatus} from "../../redux/selectors/chat-selectors";
import React, {useEffect} from "react";
import {startMessagesListening, stopMessagesListening} from "../../redux/reducer/chat-reducer";
import {EStatus} from "../../api/chat-api";
import {Alert} from "antd";
import {Messages} from "./Messages";
import {MessageForm} from "./MessageForm";

export const Chat = () => {
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            {status === EStatus.error
            && <Alert message="Some error occurred. Please refresh page." type="error" showIcon closable/>}
            <Messages/>
            <MessageForm/>
        </>
    );
};