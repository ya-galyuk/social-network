import {v4 as uuidv4} from 'uuid';
import {IDialogs, IMessages} from "../../types/redux/DialogsTypes";
import {InferActionType} from "../redux-store";

let initialState = {
    dialogs: [
        {id: '1', username: 'Username 1',},
        {id: '2', username: 'Username 2',},
    ] as Array<IDialogs>,
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
    ] as Array<IMessages>,
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "DIALOGS/SEND_MESSAGE": {
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

export const actions = {
    sendMessage: (newMessage: string) => ({type: 'DIALOGS/SEND_MESSAGE', payload: {newMessage}} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>