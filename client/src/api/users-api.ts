import {instance} from "./config";
import {TResponse} from "../types/ApiTypes";
import {UserType} from "../types/redux/UsersTypes";

interface IUsersResponse{
    items: Array<UserType>,
    totalCount: number
}

const getUsers = (page = 1, pageSize = 10) => {
    return instance.get<TResponse<IUsersResponse>>(`users?page=${page}&count=${pageSize}`)
        .then(response => response.data)
}

const follow = (userId: string) => {
    return instance.post<TResponse>(`follow/${userId}`, {})
        .then(response => response.data)
}

const unfollow = (userId: string) => {
    return instance.delete<TResponse>(`unfollow/${userId}`)
        .then(response => response.data)
}

const exports = {
    getUsers,
    follow,
    unfollow
};

export default exports;
