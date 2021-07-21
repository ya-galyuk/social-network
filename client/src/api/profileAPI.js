import {instance} from "./config";

const getProfile = (userId) => {
    return instance.get(`profile/${userId}`)
        .then(response => response.data)
}

const exports = {
    getProfile,
};

export default exports;