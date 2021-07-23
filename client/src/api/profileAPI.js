import {instance} from "./config";

const getProfile = (userId) => {
    return instance.get(`profile/${userId}`)
        .then(response => response.data)
}

const getUserStatus = (userId) => {
    return instance.get(`profile/status/${userId}`)
        .then(response => response.data)
}

const updateUserStatus = (status) => {
    return instance.put(`profile/status`, {status})
        .then(response => response.data)
}

const exports = {
    getProfile,
    getUserStatus,
    updateUserStatus
};

export default exports;