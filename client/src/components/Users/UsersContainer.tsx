import {connect} from "react-redux";
import {
    requestUsers, follow, unfollow
} from "../../redux/reducer/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalCount, getUsers
} from "../../redux/selectors/users-selectors";
import {UserType} from "../../types/redux/UsersTypes";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalCount: number
    isLoading: boolean
    followingInProgress: Array<string>
}

type DispatchStatePropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropsType & DispatchStatePropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, getUsers} = this.props
        getUsers(currentPage, pageSize)
    }

    onPageClick = (pageNumber: number): void => {
        const {pageSize, getUsers} = this.props
        getUsers(pageNumber, pageSize)
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
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalCount: getTotalCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state)
})

export default compose(
    connect<MapStatePropsType, DispatchStatePropsType, {}, AppStateType>(mapStateToProps, {
        follow, unfollow,
        getUsers: requestUsers
    }),
)(UsersContainer)