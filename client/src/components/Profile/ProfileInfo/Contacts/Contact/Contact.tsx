import React, {FC} from 'react';
import cls from "../Contacts.module.css";
import {
    GithubOutlined,
    MailOutlined,
    YoutubeOutlined,
    LinkedinOutlined,
    SendOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import {Typography} from "antd";

const {Link} = Typography;

export const ContactIcon: { [key: string]: JSX.Element } = {
    github: <GithubOutlined/>,
    youtube: <YoutubeOutlined/>,
    linkedin: <LinkedinOutlined/>,
    website: <GlobalOutlined/>,
    telegram: <SendOutlined/>,
    email: <MailOutlined/>
}

export const Contact: FC<PropsType> = (props) => {
    const {itemTitle, value} = props
    return (
        <div className={cls.contacts__item}>
            <span>{ContactIcon[itemTitle.toLowerCase()]}</span>
            <span>{itemTitle}: </span>
            <Link href={itemTitle.toLowerCase() === 'email' ? `mailto:${value}` : value} target="_blank">{value}</Link>
        </div>
    );
};

type PropsType = {
    itemTitle: string
    value: string
}