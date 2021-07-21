import {instance} from "./config";

const getProfile = (userId) => {
    return instance.get(`profile/${userId}`)
        .then(response => response.data)
}

export default {
    getProfile
}