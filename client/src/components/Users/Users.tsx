import React, {FC} from 'react';
import cls from './Users.module.css'
import Pagination from "../common/Pagination/Pagination";
import User from "./User";
import {UserType} from "../../types/redux/UsersTypes";

const Users: FC<PropsType> = (props) => {
    const {
        users, followingInProgress, follow, unfollow,
        currentPage, totalCount, pageSize, onPageClick
    } = props

    return (
        <>
            <div className={cls.user__list}>
                {users.map(user =>
                    <User key={user.id} user={user} followingInProgress={followingInProgress} follow={follow}
                          unfollow={unfollow}/>
                )}
            </div>
            <Pagination currentPage={currentPage} totalCount={totalCount} pageSize={pageSize}
                        onPageClick={onPageClick}/>
        </>
    );
};

export default Users;

type PropsType = {
    users: Array<UserType>
    currentPage: number
    totalCount: number
    pageSize: number
    followingInProgress: Array<string>
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onPageClick: (pageNumber: number) => void
}