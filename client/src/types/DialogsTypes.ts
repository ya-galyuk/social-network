import {SEND_MESSAGE} from "../redux/reducer/dialogs-reducer";

export interface IDialogs {
    id: string,
    username: string
}

export interface IMessages {
    id: string,
    link: string,
    text: string
}

export type InitialStateType = {
    dialogs: Array<IDialogs>,
    messages: Array<IMessages>
}

type SendMessageActionPayloadType = {
    newMessage: string
}
export type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    payload: SendMessageActionPayloadType
}