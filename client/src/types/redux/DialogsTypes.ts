import {SEND_MESSAGE} from "../../redux/reducer/dialogs-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../redux/redux-store";

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

export type ActionsType = SendMessageActionType

type SendMessageActionPayloadType = {
    newMessage: string
}
export type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    payload: SendMessageActionPayloadType
}

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>