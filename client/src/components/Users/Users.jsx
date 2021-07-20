import React from 'react';
import cls from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

const Users = (props) => {

    if (props.users.length === 0) {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                props.setUsers(response.data.users.items)
            })
    }

    return (
        <>
            {props.users.map(user =>
                <div className={cls.user} key={user.id}>
                    <div>
                        <div className={cls.user__photo}>
                            <img className={cls.user__img}
                                 src={user.avatarLink !== null ? user.avatarLink : userPhoto}
                                 alt=""/>
                        </div>
                        {
                            user.followed
                                ? <button onClick={() => {
                                    props.onUnfollow(user.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.onFollow(user.id)
                                }}>Follow</button>

                        }
                    </div>
                    <div className={cls.user__info}>
                        <div>
                            <span className={cls.user__fullname}>{user.fullName}</span>
                            <p className={cls.user__status}>{user.status}</p>
                        </div>
                        <div className={cls.user__location}>
                            {user.location.country}, {user.location.city}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;