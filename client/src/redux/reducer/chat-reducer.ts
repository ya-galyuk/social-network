import {FormAction} from "redux-form";
import {BaseThunkType, InferActionType} from "../redux-store";
import {chatAPI, EEvent, EStatus, IChatMessage} from "../../api/chat-api";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as IChatMessage[],
    status: EStatus.pending
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "chat/MESSAGES_RECEIVED" : {
            return {
                ...state, messages: [...state.messages, ...action.payload.messages]
                    .filter((m, index, array) => index >= array.length - 15)
            };
        }
        case "chat/STATUS_CHANGED" : {
            return {...state, status: action.payload.status};
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    messagesReceived: (messages: IChatMessage[]) => ({type: 'chat/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: EStatus) => ({type: 'chat/STATUS_CHANGED', payload: {status}} as const),
}

let _messagesHandler: ((messages: IChatMessage[]) => void) | null = null
const messagesHandlerCreator = (dispatch: Dispatch) => {
    if (!_messagesHandler) {
        _messagesHandler = (messages) => dispatch(actions.messagesReceived(messages))
    }
    return _messagesHandler
}

let _statusHandler: ((status: EStatus) => void) | null = null
const statusHandlerCreator = (dispatch: Dispatch) => {
    if (!_statusHandler) {
        _statusHandler = (status) => dispatch(actions.statusChanged(status))
    }
    return _statusHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(EEvent.messageReceived, messagesHandlerCreator(dispatch))
    chatAPI.subscribe(EEvent.statusChanged, statusHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(EEvent.messageReceived, messagesHandlerCreator(dispatch))
    chatAPI.unsubscribe(EEvent.statusChanged, statusHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessages = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>