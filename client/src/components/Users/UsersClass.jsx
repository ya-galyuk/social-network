import React from 'react';
import cls from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

class Users extends React.Component {

    componentDidMount() {
        axios.get(`http://localhost:5000/api/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.users.items)
                this.props.setTotalCount(response.data.totalCount)
            })
    }

    onPageClick = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`http://localhost:5000/api/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.users.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <>
            <div className={cls.pagination}>
                {
                    pages.map(page =>
                            <span
                                key={page}
                                className={this.props.currentPage === page && cls.page_selected}
                                onClick={(e) => this.onPageClick(page)}
                            >
                        {page}
                    </span>
                    )}
            </div>

            {this.props.users?.map(user =>
                <div className={cls.user} key={user.id}>
                    <div>
                        <div className={cls.user__photo}>
                            <img className={cls.user__img}
                                 src={user.photo || userPhoto}
                                 alt=""/>
                        </div>
                        {
                            user.followed
                                ? <button onClick={() => {
                                    this.props.onUnfollow(user.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.onFollow(user.id)
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
    }
}

export default Users;