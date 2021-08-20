import {useSelector} from "react-redux";
import {getMessages} from "../../redux/selectors/chat-selectors";
import React, {useEffect, useRef, useState} from "react";
import {Message} from "./Message/Message";

export const Messages = React.memo(() => {
    const messages = useSelector(getMessages)
    const messagesDownRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const el = e.currentTarget
        const diffScrollAndClient = Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight)
        diffScrollAndClient < 200 ? setIsAutoScroll(true) : setIsAutoScroll(false)
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesDownRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: 'calc(100vh - 206px)', overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((m) => <Message message={m} key={m.id}/>)}
            <div ref={messagesDownRef}/>
        </div>
    );
});