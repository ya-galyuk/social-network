import React from 'react';
import cls from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import usersAPI from "../../api/usersAPI";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <div className={cls.pagination}>
                {pages.map(page => <span
                        key={page}
                        className={props.currentPage === page ? cls.page_selected : undefined}
                        onClick={(e) => props.onPageClick(page)}
                    >{page}</span>
                )}
            </div>

            {props.users.map(user =>
                <div className={cls.user} key={user.id}>
                    <div>
                        <div className={cls.user__photo}>
                            <NavLink to={`/profile/${user.id}`}>
                                <img className={cls.user__img}
                                     src={user.photo || userPhoto}
                                     alt=""/>
                            </NavLink>
                        </div>
                        {user.followed
                            ? <button onClick={() => {

                                usersAPI.unfollow(user.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.onUnfollow(user.id)
                                    }
                                })


                            }}>Unfollow</button>

                            : <button onClick={() => {

                                usersAPI.follow(user.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.onFollow(user.id)
                                    }
                                })

                            }}>Follow</button>
                        }
                    </div>
                    <div className={cls.user__info}>
                        <div>
                            <span className={cls.user__fullname}>{user.fullName}</span>
                            <p className={cls.user__status}>{user.status}</p>
                        </div>
                        <div className={cls.user__location}>
                            {/*{user.location.country}, {user.location.city}*/}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;