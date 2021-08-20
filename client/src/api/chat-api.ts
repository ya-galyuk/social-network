export enum EStatus {
    pending = 'pending',
    ready = 'ready',
    error = 'error',
}

export enum EEvent {
    messageReceived = 'message-received',
    statusChanged = 'status-changed'
}

let subscribes = {
    'message-received': [] as TMessageSubscribe[],
    'status-changed': [] as TStatusSubscribe[],
}

let ws: WebSocket | null = null
const wsUrl = 'ws://localhost:9000'

/**
 * handlers
 * */
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribes[EEvent.messageReceived].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersOfStatus(EStatus.ready)
}

const closeHandler = () => {
    notifySubscribersOfStatus(EStatus.pending)
    setTimeout(createChanel, 3000)
}

const errorHandler = () => {
    notifySubscribersOfStatus(EStatus.error)
    console.error('Refresh page!')
}

/**
 * helpers
 * */
const notifySubscribersOfStatus = (status: EStatus) => {
    subscribes[EEvent.statusChanged].forEach(s => s(status))
}

const cleanUpEventListener = () => {
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('error', errorHandler)
}

const createChanel = () => {
    ws?.removeEventListener('close', closeHandler)
    cleanUpEventListener()
    ws?.close()

    ws = new WebSocket(wsUrl)
    notifySubscribersOfStatus(EStatus.pending)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('error', errorHandler)
}

/**
 * functions
 * */

const start = () => {
    createChanel()
}

const stop = () => {
    subscribes[EEvent.messageReceived] = []
    subscribes[EEvent.statusChanged] = []
    cleanUpEventListener()
    ws?.close()
}

const subscribe = (event: EEvent, cb: TMessageSubscribe | TStatusSubscribe) => {
    // @ts-ignore
    subscribes[event].push(cb)
    // @ts-ignore
    return () => subscribes[event].filter(s => s !== cb)
}

const unsubscribe = (event: EEvent, cb: TMessageSubscribe | TStatusSubscribe) => {
    // @ts-ignore
    subscribes[event] = subscribes[event].filter(s => s !== cb)
}

const sendMessage = (message: string) => {
    ws?.send(message)
}

export const chatAPI = {
    start,
    stop,
    subscribe,
    unsubscribe,
    sendMessage
}

export interface IChatMessage {
    id: string;
    userId: string;
    photo: string;
    userName: string;
    message: string;
    dataTime: string;
}

type TMessageSubscribe = (message: IChatMessage[]) => void
type TStatusSubscribe = (status: EStatus) => void

