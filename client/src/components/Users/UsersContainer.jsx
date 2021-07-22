import {connect} from "react-redux";
import {
    onFollow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsLoading,
    onUnfollow,
    toggleIsFollowingInProgress
} from "../../redux/reducer/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import usersAPI from "../../api/usersAPI";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsLoading(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsLoading(false)
                this.props.setUsers(data.users.items)
                this.props.setTotalCount(data.totalCount)
            })
    }

    onPageClick = (pageNumber) => {
        this.props.toggleIsLoading(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsLoading(false)
                this.props.setUsers(data.users.items)
            })
    }

    render() {
        return <>
            {this.props.isLoading ? <Preloader/> : null}
            <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageClick={this.onPageClick}
                users={this.props.users}
                onFollow={this.props.onFollow}
                onUnfollow={this.props.onUnfollow}
                followingInProgress={this.props.followingInProgress}
                toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress
})

export default connect(mapStateToProps, {
    onFollow,
    onUnfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsLoading,
    toggleIsFollowingInProgress
})(UsersContainer);