import {instance} from "./config";
import {ProfileType} from "../types/redux/ProfileTypes";
import {IProfileResponse, IProfileStatusResponse, IProfilePhotoResponse} from "../types/ApiTypes";

const getProfile = (userId: string) => {
    return instance.get<IProfileResponse>(`profile/${userId}`)
        .then(response => response.data)
}

const updateProfile = (profile: ProfileType) => {
    return instance.put<IProfileResponse>(`profile`, {profile})
        .then(response => response.data)
}

const getUserStatus = (userId: string) => {
    return instance.get<IProfileStatusResponse>(`profile/status/${userId}`)
        .then(response => response.data)
}

const updateUserStatus = (status: string) => {
    return instance.put<IProfileStatusResponse>(`profile/status`, {status})
        .then(response => response.data)
}

const updatePhoto = (photoFile: any) => {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance.put<IProfilePhotoResponse>(`profile/photo`, formData, {
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