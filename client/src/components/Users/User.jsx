import React from 'react';
import cls from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";

const User = (props) => {
    const {user, followingInProgress, follow, unfollow} = props

    return (
        <div className={cls.user__item}>
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
                          disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => unfollow(user.id)}>Unfollow</button>
                : <button className={cls.user__btn}
                          disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => follow(user.id)}>Follow</button>
            }
        </div>
    );
};

export default User;