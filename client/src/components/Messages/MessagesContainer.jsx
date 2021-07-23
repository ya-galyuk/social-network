import {sendMessage, updateNewMessageBody} from "../../redux/reducer/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => ({
    messagesPage: state.messagesPage
})

export default compose(
    connect(mapStateToProps, {
        sendMessage,
        updateNewMessageBody
    }),
    // withAuthRedirect,
)(Messages);