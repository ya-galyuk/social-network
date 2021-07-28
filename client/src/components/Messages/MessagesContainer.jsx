import {sendMessage} from "../../redux/reducer/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";

let mapStateToProps = (state) => ({
    messagesPage: state.messagesPage
})

export default compose(
    connect(mapStateToProps, {
        sendMessage
    }),
)(Messages);