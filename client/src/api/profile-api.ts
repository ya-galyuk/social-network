import {instance} from "./config";
import {ProfilePhotosType, ProfileType} from "../types/redux/ProfileTypes";
import {TResponse} from "../types/ApiTypes";

interface IStatusResponse {
    status: string
}

const getProfile = (userId: string) => {
    return instance.get<TResponse<ProfileType>>(`profile/${userId}`)
        .then(response => response.data)
}

const updateProfile = (profile: ProfileType) => {
    return instance.put<TResponse<ProfileType>>(`profile`, {profile})
        .then(response => response.data)
}

const getUserStatus = (userId: string) => {
    return instance.get<TResponse<IStatusResponse>>(`profile/status/${userId}`)
        .then(response => response.data)
}

const updateUserStatus = (status: string) => {
    return instance.put<TResponse<IStatusResponse>>(`profile/status`, {status})
        .then(response => response.data)
}

const updatePhoto = (photoFile: File) => {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance.put<TResponse<ProfilePhotosType>>(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => response.data)
}


const exports = {
    getProfile,
    getUserStatus,
    updateUserStatus,
    updatePhoto,
    updateProfile
};

export default exports;