import React from 'react';
import cls from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <div className={cls.user__list}>
                {props.users.map(user =>
                    <div className={cls.user__item} key={user.id}>
                        <NavLink to={`/profile/${user.id}`} className={cls.user__link}>
                            <div className={cls.user__photo}>
                                <img className={cls.user__img}
                                     src={user.photos.small || userPhoto}
                                     alt=""/>
                            </div>
                            <div className={cls.user__info}>
                                <span className={cls.user__fullName}>{user.fullName}</span>
                                <p className={cls.user__about}>{user.about}</p>
                            </div>
                        </NavLink>

                        {user.followed
                            ? <button className={cls.user__btn}
                                      disabled={props.followingInProgress.some(id => id === user.id)}
                                      onClick={() => props.unfollow(user.id)}>Unfollow</button>
                            : <button className={cls.user__btn}
                                      disabled={props.followingInProgress.some(id => id === user.id)}
                                      onClick={() => props.follow(user.id)}>Follow</button>
                        }
                    </div>
                )}
            </div>

            <div className={cls.pagination}>
                {pages.map(page => <span
                        key={page}
                        className={props.currentPage === page ? cls.page_selected : undefined}
                        onClick={(e) => props.onPageClick(page)}
                    >{page}</span>
                )}
            </div>
        </>
    );
};

export default Users;