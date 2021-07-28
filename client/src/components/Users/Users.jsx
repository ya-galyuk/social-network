import React from 'react';
import cls from './Users.module.css'
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = (props) => {
    const {
        users, followingInProgress, follow, unfollow,
        currentPage, totalCount, pageSize, onPageClick
    } = props

    return (
        <>
            <div className={cls.user__list}>
                {users.map(user =>
                    <User key={user.id} user={user} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow}/>
                )}
            </div>
            <Pagination currentPage={currentPage} totalCount={totalCount} pageSize={pageSize}
                        onPageClick={onPageClick}/>
        </>
    );
};

export default Users;