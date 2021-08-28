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
            <Menu.Item key="users" className={cls.menu__item}>
                <NavLink to="/users"><TeamOutlined/>
                    <span className={cls.menu__link_mob}>Users</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="mail" className={cls.menu__item}>
                <Badge count={messageCount} offset={[5, 0]}>
                    <NavLink to="/chat"><MailOutlined/>
                        <span className={cls.menu__link_mob}>Messages</span>
                    </NavLink>
                </Badge>
            </Menu.Item>
            {isAuth ?
                <SubMenu key="SubMenu" icon={<Avatar shape="square" src={''} icon={<UserOutlined/>}/>}
                         title={login}>
                    <Menu.Item key="profile" className={cls.menu__item}>
                        <NavLink to="/profile"><span>Profile</span></NavLink>
                    </Menu.Item>
                    <Menu.Item key="settings" className={cls.menu__item}>
                        <NavLink to="/settings"><span>Settings</span></NavLink>
                    </Menu.Item>
                    <Divider style={{margin: "8px 0"}}/>
                    <Menu.Item key="logout" onClick={onLogout} className={cls.menu__item}>
                        <LogoutOutlined/><span>Log out</span>
                    </Menu.Item>
                </SubMenu>
                : <Menu.Item key="login" className={cls.menu__item}>
                    <NavLink to={'/login'}><LoginOutlined/>
                        <span className={cls.menu__link_mob}>Login</span>
                    </NavLink>
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