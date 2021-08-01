import {instance} from "./config";
import {IUsersFollowUnfollowResponse, IUsersResponse} from "../types/ApiTypes";

const getUsers = (page = 1, pageSize = 10) => {
    return instance.get<IUsersResponse>(`users?page=${page}&count=${pageSize}`)
        .then(response => response.data)
}

const follow = (userId: string) => {
    return instance.post<IUsersFollowUnfollowResponse>(`follow/${userId}`, {})
        .then(response => response.data)
}

const unfollow = (userId: string) => {
    return instance.delete<IUsersFollowUnfollowResponse>(`unfollow/${userId}`)
        .then(response => response.data)
}

const exports = {
    getUsers,
    follow,
    unfollow
};

export default exports;
