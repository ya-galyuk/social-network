import {instance} from "./config";

const getUsers = (page = 1, pageSize = 10) => {
    return instance.get(`users?page=${page}&count=${pageSize}`)
        .then(response => response.data)
}

const follow = (userId) => {
    return instance.post(`follow/${userId}`, {})
        .then(response => response.data)
}

const unfollow = (userId) => {
    return instance.delete(`unfollow/${userId}`)
        .then(response => response.data)
}

const exports = {
    getUsers,
    follow,
    unfollow
};

export default exports;
