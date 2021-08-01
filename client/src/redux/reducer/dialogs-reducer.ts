import {v4 as uuidv4} from 'uuid';
import {InitialStateType, SendMessageActionType} from "../../types/DialogsTypes";

export const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

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

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
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

export const sendMessage = (newMessage: string): SendMessageActionType => ({type: SEND_MESSAGE, payload: {newMessage}})

export default dialogsReducer