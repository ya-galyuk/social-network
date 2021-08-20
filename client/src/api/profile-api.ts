import {instance} from "./config";
import {IProfileContacts, ProfileDetails, ProfilePhotosType, ProfileType} from "../types/redux/ProfileTypes";
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

const updateUserStatus = (status: string | null) => {
    return instance.put<TResponse<IStatusResponse>>(`profile/status`, {status})
        .then(response => response.data)
}

const updatePhoto = (photoFile: File | null) => {
    let formData = new FormData()
    photoFile
        ? formData.append("image", photoFile)
        : formData.append("image", '')

    return instance.put<TResponse<ProfilePhotosType>>(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => response.data)
}

const updateProfileAbout = (about: string | null) => {
    return instance.put<TResponse<ProfileType>>(`profile/about`, {about})
        .then(response => response.data)
}

const updateProfileContacts = (contacts: IProfileContacts) => {
    return instance.put<TResponse<ProfileType>>(`profile/contacts`, {contacts})
        .then(response => response.data)
}

const updateProfileDetails = (details: ProfileDetails) => {
    return instance.put<TResponse<ProfileType>>(`profile/details`, {details})
        .then(response => response.data)
}

export const profileAPI = {
    getProfile,
    getUserStatus,
    updateUserStatus,
    updatePhoto,
    updateProfile,
    updateProfileAbout,
    updateProfileContacts,
    updateProfileDetails
};
