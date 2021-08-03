import {ProfilePhotosType} from "./ProfileTypes";

type UsersLocationType = {
    country: string | null,
    city: string | null
}

export type UserType = {
    id: string,
    fullName: string,
    about: string | null,
    status: string | null,
    location: UsersLocationType,
    photos: ProfilePhotosType,
    followed: boolean
}