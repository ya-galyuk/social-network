import {connect} from "react-redux";
import {
    onFollow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsLoading,
    onUnfollow
} from "../../redux/reducer/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsLoading(true)
        axios.get(`http://localhost:5000/api/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsLoading(false)
                this.props.setUsers(response.data.users.items)
                this.props.setTotalCount(response.data.totalCount)
            })
    }

    onPageClick = (pageNumber) => {
        this.props.toggleIsLoading(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`http://localhost:5000/api/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsLoading(false)
                this.props.setUsers(response.data.users.items)
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
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading
    }
}

export default connect(mapStateToProps, {
    onFollow,
    onUnfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsLoading,
})(UsersContainer);