import {ProfilePhotosType} from "./ProfileTypes";

type UsersLocationType = {
    country: string,
    city: string
}

export type UserType = {
    id: string,
    fullName: string,
    about: string,
    status: string,
    location: UsersLocationType,
    photos: ProfilePhotosType,
    followed: boolean
}