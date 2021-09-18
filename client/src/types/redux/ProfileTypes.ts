export type PostsType = {
    id: string
    href?: string
    author: string
    avatar: string | null
    content: string
    datetime: string
    action: {
        like: number
        comment: number
    }
}

export type ProfilePhotosType = {
    small: string | null
    large: string | null
}

export interface IProfileContacts {
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

export type ProfileDetails = {
    fullName: string
    status: string
}

export type ProfileType = {
    userId: string,
    fullName: string,
    status: string | null,
    photos: ProfilePhotosType | null,
    about: string | null
    contacts: IProfileContacts,
    educations: Array<ProfileEducationsType> | null,
    job: ProfileJobType | null
}