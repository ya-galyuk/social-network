import React, {FC} from "react";
import {Avatar, Divider} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {IChatMessage} from "../../../api/chat-api";

type PropsType = {
    message: IChatMessage
}
export const Message: FC<PropsType> = React.memo((props) => {
    const {message} = props
    return (
        <>
            <div style={{display: "flex"}}>
                <div style={{marginRight: 20}}>
                    <Avatar size="large" src={message.photo} icon={<UserOutlined/>}/>
                </div>
                <div style={{flex: 1}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{fontWeight: 600}}>{message.userName}</div>
                        <div>{message.dataTime}</div>
                    </div>
                    <div>{message.message}</div>
                </div>
            </div>
            <Divider/>
        </>
    );
})