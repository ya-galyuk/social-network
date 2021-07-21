// import React from 'react';
import {sendMessage, updateNewMessageBody} from "../../redux/reducer/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    messagesPage: state.messagesPage
})

const MessagesContainer = connect(mapStateToProps, {
    sendMessage,
    updateNewMessageBody
})(Messages);

export default MessagesContainer;