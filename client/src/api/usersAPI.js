import {instance} from "./config";

const getUsers = (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
}

const follow = (userId) => {
    return instance.post(`follow/${userId}`, {})
        .then(response => response.data)
}

const unfollow = (userId) => {
    return instance.post(`unfollow/${userId}`)
        .then(response => response.data)
}

export default {
    getUsers,
    follow,
    unfollow
}

