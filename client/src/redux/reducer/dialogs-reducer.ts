import {v4 as uuidv4} from 'uuid';
import {IDialogs, IMessages} from "../../types/redux/DialogsTypes";
import {InferActionType} from "../redux-store";

type InitialStateType = {
    dialogs: Array<IDialogs>,
    messages: Array<IMessages>
}

let initialState: InitialStateType = {
    dialogs: [
        {id: '1', username: 'Username 1',},
        {id: '2', username: 'Username 2',},
    ],
    messages: [
        {
            id: '1',
            link: 'http://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg',
            text: 'Message text 1',
        },
        {
            id: '2',
            link: 'http://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg',
            text: 'Message text 2',
        },
    ],
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SEND_MESSAGE": {
            let newMessage = {
                id: uuidv4(),
                link: 'http://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg',
                text: action.payload.newMessage,
            }
            return {...state, messages: [...state.messages, newMessage]};
        }
        default: {
            return state
        }
    }
}
type ActionsTypes = InferActionType<typeof actions>

export const actions = {
    sendMessage: (newMessage: string) => ({type: 'SEND_MESSAGE', payload: {newMessage}} as const)
}
export default dialogsReducer