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