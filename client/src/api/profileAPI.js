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

const savePhoto = (photoFile) => {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => response.data)
}

const saveProfile = (data) => {
    return instance.put(`profile`, {data})
        .then(response => response.data)
}

const exports = {
    getProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile
};

export default exports;