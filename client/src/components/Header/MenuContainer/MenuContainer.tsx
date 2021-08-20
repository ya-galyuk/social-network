import React, {FC, useState} from 'react';
import cls from './Menu.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Badge, Divider, Menu} from "antd";
import {LoginOutlined, LogoutOutlined, MailOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";

const {SubMenu} = Menu

export const MenuContainer: FC<PropsType> = (props) => {
    const {isAuth, login, onLogout} = props

    const [current, setCurrent] = useState('profile')

    const handleClick = (e: { key: React.SetStateAction<string> }) => {
        setCurrent(e.key)
    };

    const messageCount = 0

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className={cls.menu}>
            <Menu.Item key="users">
                <NavLink to="/users"><TeamOutlined/><span>Users</span></NavLink>
            </Menu.Item>
            <Menu.Item key="mail" icon={<MailOutlined/>}>
                <Badge count={messageCount} offset={[5, 0]}>
                    <NavLink to="/chat">Messages</NavLink>
                </Badge>
            </Menu.Item>
            {isAuth ?
                <SubMenu key="SubMenu" icon={<Avatar shape="square" src={''} icon={<UserOutlined/>}/>}
                         title={login}>
                    <Menu.Item key="profile">
                        <NavLink to="/profile"><span>Profile</span></NavLink>
                    </Menu.Item>
                    <Menu.Item key="settings">
                        <NavLink to="/settings"><span>Settings</span></NavLink>
                    </Menu.Item>
                    <Divider style={{margin: "8px 0"}}/>
                    <Menu.Item key="logout" onClick={onLogout}>
                        <LogoutOutlined/><span>Log out</span>
                    </Menu.Item>
                </SubMenu>
                : <Menu.Item key="login" icon={<LoginOutlined/>}>
                    <NavLink to={'/login'}>Login</NavLink>
                </Menu.Item>
            }
        </Menu>
    );
}

type PropsType = {
    isAuth: boolean
    login: string | null
    onLogout: () => void
}