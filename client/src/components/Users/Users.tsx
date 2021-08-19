import React, {FC, useEffect} from 'react';
import cls from './Users.module.css'
import {User} from "./User";
import SearchForm from "./Search/SearchForm";
import {follow, requestUsers, TFilter, unfollow} from "../../redux/reducer/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalCount,
    getUsers
} from "../../redux/selectors/users-selectors";
import {useHistory} from "react-router";
import queryString from "query-string";
import {Pagination, Row} from 'antd';

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalCount = useSelector(getTotalCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        const parsed: TQuery = queryString.parse(history.location.search, {parseBooleans: true});

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.query) actualFilter = {...actualFilter, query: parsed.query}
        if (!!parsed.followed) actualFilter = {...actualFilter, followed: parsed.followed}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const queryObj: TQuery = {}

        if (!!filter.query) queryObj.query = filter.query
        if (filter.followed !== null) queryObj.followed = filter.followed
        if (currentPage !== 1) queryObj.page = currentPage

        history.push({
            pathname: '/users',
            search: queryString.stringify(queryObj)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number): void => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: TFilter) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const onFollow = (userId: string) => {
        dispatch(follow(userId))
    }

    const onUnfollow = (userId: string) => {
        dispatch(unfollow(userId))
    }

    return <>
        <SearchForm onFilterChanged={onFilterChanged}/>
        <div className={cls.user__list}>
            {users.map(user =>
                <User key={user.id} user={user} followingInProgress={followingInProgress} follow={onFollow}
                      unfollow={onUnfollow}/>
            )}
        </div>
        <Row justify="center">
            <Pagination onChange={onPageChanged} total={totalCount} defaultCurrent={currentPage} pageSize={pageSize}/>
        </Row>
    </>
};

type PropsType = {}

type TQuery = {
    query?: string
    followed?: boolean | null
    page?: number
}