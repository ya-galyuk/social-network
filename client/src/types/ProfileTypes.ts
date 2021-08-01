import {
    ADD_POST,
    DELETE_POST,
    SET_USER_PHOTO,
    SET_USER_PROFILE,
    SET_USER_STATUS
} from "../redux/reducer/profile-reducer";

export type PostsType = {
    id: string,
    time: string,
    text: string
}

export type ProfilePhotosType = {
    small: string | null
    large: string | null
}

export type ProfileContactsType = {
    Email: string | null,
    Telegram: string | null,
    GitHub: string | null,
    YouTube: string | null,
    LinkedIn: string | null,
    WebSite: string | null
}

export type ProfileEducationsUniversityType = {
    logo: string,
    name: string
}

export type ProfileEducationsType = {
    country: string,
    city: string,
    university: ProfileEducationsUniversityType,
    fieldOfStudy: string,
    degree: string,
    startYear: string,
    endYear: string
}

export type ProfileJobType = {
    lookingForAJob: boolean,
    description: string
}

export type ProfileType = {
    userId: string,
    fullName: string,
    status: string | null,
    photos: ProfilePhotosType,
    about: string | null
    contacts: ProfileContactsType,
    educations: Array<ProfileEducationsType>,
    job: ProfileJobType
}

export type InitialStateType = {
    posts: Array<PostsType>,
    profile: Array<ProfileType> | null
}

type AddPostActionPayloadType = {
    postMessage: string
}
export type AddPostActionType = {
    type: typeof ADD_POST
    payload: AddPostActionPayloadType
}

type DeletePostActionPayloadType = {
    postId: string
}
export type DeletePostActionType = {
    type: typeof DELETE_POST
    payload: DeletePostActionPayloadType
}

type SetUserProfileActionPayloadType = {
    profile: ProfileType
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: SetUserProfileActionPayloadType
}

type SetUserStatusActionPayloadType = {
    status: string
}
export type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    payload: SetUserStatusActionPayloadType
}

// TODO: check photos type
type SetUserPhotoActionPayloadType = {
    photos: ProfilePhotosType
}
export type SetUserPhotoActionType = {
    type: typeof SET_USER_PHOTO
    payload: SetUserPhotoActionPayloadType
}