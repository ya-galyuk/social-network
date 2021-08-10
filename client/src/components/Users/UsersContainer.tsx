import {connect} from "react-redux";
import {
    requestUsers, follow, unfollow, TFilter
} from "../../redux/reducer/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFilter,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalCount, getUsers
} from "../../redux/selectors/users-selectors";
import {UserType} from "../../types/redux/UsersTypes";
import {AppStateType} from "../../redux/redux-store";

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, getUsers, filter} = this.props
        getUsers(currentPage, pageSize, filter)
    }

    onPageClick = (pageNumber: number): void => {
        const {pageSize, getUsers, filter} = this.props
        getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: TFilter) => {
        const {pageSize, getUsers} = this.props
        getUsers(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isLoading ? <Preloader/> : null}
            <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageClick={this.onPageClick}
                onFilterChanged={this.onFilterChanged}
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
    filter: getFilter(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state)
})

export default compose<React.ComponentType>(
    connect<MapStatePropsType, DispatchStatePropsType, {}, AppStateType>(mapStateToProps, {
        follow, unfollow,
        getUsers: requestUsers
    }),
)(UsersContainer)


type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalCount: number
    isLoading: boolean
    followingInProgress: Array<string>
    filter: TFilter
}

type DispatchStatePropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    getUsers: (currentPage: number, pageSize: number, filter: TFilter) => void
}

type PropsType = MapStatePropsType & DispatchStatePropsType