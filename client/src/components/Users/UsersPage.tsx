import React, {FC, useEffect, useState} from 'react';
import cls from './Users.module.css'
import {User} from "./User";
import SearchForm from "./Search/SearchForm";
import {useHistory} from "react-router";
import queryString from "query-string";
import {Pagination, Row, Skeleton} from 'antd';
import {gql, useMutation, useQuery} from "@apollo/client";
import {convertToBoolOrNull} from "../../utils/helpers/followed-helper";

const UsersPage: FC<PropsType> = (props) => {
    const [users, setUsers] = useState<IUserAll[] | null>(null)
    const [followingUser, setFollowingUser] = useState<string | null>(null)
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)
    const [filter, setFilter] = useState<IFilter>({query: '', followed: null})

    const history = useHistory();

    const {loading: getUsersLoading, data, refetch} = useQuery(GET_ALL_USERS_QUERY, {
        variables: {
            offset: currentPage,
            limit: pageSize,
            filter: filter
        },
        onCompleted: ({getUsers}) => {
            setUsers(getUsers?.items)
            setTotalCount(getUsers?.totalCount)
        }
    });

    const [follow, {loading: followLoading}] = useMutation(FOLLOW_USER_MUTATION)

    useEffect(() => {
        const parsed: IQuery = queryString.parse(history.location.search, {parseBooleans: true});

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.query) actualFilter = {...actualFilter, query: parsed.query}
        if (!!parsed.followed) actualFilter = {...actualFilter, followed: parsed.followed}

        setCurrentPage(actualPage)
        setPageSize(pageSize)
        setFilter(actualFilter)
    }, [])

    useEffect(() => {
        setUsers(data?.getUsers.items)
    }, [data])

    useEffect(() => {
        const queryObj: IQuery = {}

        if (!!filter.query) queryObj.query = filter.query
        if (filter.followed !== null) queryObj.followed = filter.followed
        if (currentPage !== 1) queryObj.page = currentPage

        history.push({
            pathname: '/users',
            search: queryString.stringify(queryObj)
        })
    }, [filter, currentPage])

    useEffect(() => {
        refetch()
    }, [currentPage, pageSize, filter])

    const onPageChanged = (pageNumber: number): void => {
        setCurrentPage(pageNumber)
        setPageSize(pageSize)
        setFilter(filter)
    }

    const onFilterChanged = (filter: IFilter) => {
        setCurrentPage(1)
        setPageSize(pageSize)
        setFilter({
            query: filter.query,
            followed: convertToBoolOrNull(filter.followed)
        })
    }

    const onFollow = async (userId: string) => {
        setFollowingUser(userId)
        await follow({variables: {userId}})
        await refetch()
    }

    return <>
        <SearchForm filter={filter} onFilterChanged={onFilterChanged}/>
        <Skeleton loading={getUsersLoading} active>
            <div className={cls.user__list}>
                {users?.map((user: any) =>
                    <User key={user.id} user={user} isFollowing={followLoading} followingUser={followingUser}
                          follow={onFollow}/>
                )}
            </div>
            <Row justify="center">
                <Pagination onChange={onPageChanged} total={totalCount} defaultCurrent={currentPage}
                            pageSize={pageSize}/>
            </Row>
        </Skeleton>
    </>
};

export default UsersPage

type PropsType = {}

const GET_ALL_USERS_QUERY = gql`
    query GetAllUsers($offset: Int, $limit: Int, $filter: Filter) {
        getUsers(offset: $offset, limit: $limit, filter: $filter) {
            items {
                id
                fullName
                email
                followed
                followerCount
                photos {
                    small
                }
            }
            totalCount
        }
    }
`;

const FOLLOW_USER_MUTATION = gql`
    mutation Follow($userId: ID!) {
        follow(userId: $userId) {
            id
            followed
        }
    }
`;

interface IQuery {
    query?: string;
    followed?: boolean | string | null;
    page?: number;
}

interface IUserAll {
    id: string;
    fullName: string;
    email: string;
    followed: boolean;
    followerCount: number;
    photos: {
        small: string;
    }


}

export interface IFilter {
    query: string,
    followed: boolean | string | null
}