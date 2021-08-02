import React from "react";
import {actions, InitialStateType} from "../../redux/reducer/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";

let mapStateToProps = (state: MapStatePropsType) => ({
    messagesPage: state.messagesPage
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage
    }),
)(Messages);

type MapStatePropsType = {
    messagesPage: InitialStateType;
}