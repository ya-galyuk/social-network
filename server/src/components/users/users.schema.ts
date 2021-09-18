import {gql} from "graphql-tag";

export const userTypeDefs = gql`
    scalar Upload
    
    extend type Query {
        getUsers(offset: Int, limit: Int, filter: Filter): UsersResult!
        getUser(userId: ID!): User!
        me(refreshToken: String!): Me!
    }

    extend type Mutation {
        register(registerInput: RegisterInput): AuthRes!
        login(loginInput: LoginInput): AuthRes!
        logout(refreshToken: String!): String!
        follow(userId: ID!): User!
        photoUpload(file: Upload!): File!
    }

    type UsersResult {
        items: [User!]
        totalCount: Int
    }

    type Me {
        user: MeUser!
    }

    type MeUser {
        id: ID!
        email: String!,
    }

    type AuthRes {
        user: User!
        tokens: Token!
    }

    type User {
        id: ID
        fullName: String,
        email: String,
        about: String,
        status: String,
        location: UserLocation,
        photos: Photos,
        contacts: UserContacts,
        followed: Boolean,
        followers: [UserFollower],
        educations: [UserEducations],
        job: UserJob,
        followerCount: Int,
        createdAt: String,
        updatedAt: String,
    }

    type UserLocation {
        country: String,
        city: String,
    }

    type Photos {
        small: String,
        large: String,
    }

    type UserContacts {
        Email: String,
        Telegram: String,
        GitHub: String,
        YouTube: String,
        LinkedIn: String,
        WebSite: String,
    }

    type UserEducations {
        country: String,
        city: String,
        university: UserSchool,
        fieldOfStudy: String,
        degree: String,
        startYear: String,
        endYear: String
    }

    type UserSchool {
        logo: String,
        name: String
    }

    type UserJob {
        lookingForAJob: Boolean,
        description: String
    }

    type UserFollower {
        id: ID!
        user: String!,
        createdAt: String!,
        updatedAt: String!,
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
    }

    input RegisterInput {
        email: String!,
        password: String!,
        confirmPassword: String!,
    }

    input LoginInput {
        email: String!,
        password: String!,
        remember: Boolean
    }

    input Filter {
        query: String
        followed: Boolean
    }
`

export interface IUser {
    id: string,
    fullName: string,
    email: string,
    about: string,
    location: IUserLocation,
    photos: IPhotos,
    followed: Boolean,
    followers: IUserFollower[],
    followerCount: number,
    createdAt: string,
    updatedAt: string,
}

interface IUserLocation {
}

interface IPhotos {
}

export interface IUserFollower {
    id: string,
    user: string,
    createdAt: string,
    updatedAt: string,
}