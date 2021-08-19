import React, {FC} from 'react';
import cls from './Users.module.css'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/redux/UsersTypes";
import {Avatar, Button, Row} from "antd";
import {UserOutlined} from '@ant-design/icons';

type PropsType = {
    user: UserType,
    followingInProgress: Array<string>
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

export const User: FC<PropsType> = (props) => {
    const {user, followingInProgress, follow, unfollow} = props
    const btnText = user.followed ? "Unfollow" : "Follow"

    const onBtnClick = () => user.followed ? unfollow(user.id) : follow(user.id)

    return <>
        <div className={cls.user__item}>
            <Row justify={"space-between"}>
                <Avatar shape="square" size={100} src={user.photos.small} icon={<UserOutlined/>}/>
                <Button type={"primary"} ghost className={cls.user__btn}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={onBtnClick}>{btnText}</Button>
            </Row>
            <Row>
                <NavLink to={`/profile/${user.id}`} className={cls.user__link}>
                    <div className={cls.user__fullName}>{user.fullName}</div>
                    <div className={cls.user__about}>{user.about}</div>
                </NavLink>
            </Row>
        </div>
    </>
};