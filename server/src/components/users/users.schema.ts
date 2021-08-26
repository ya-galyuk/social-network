import {gql} from "graphql-tag";

export const userTypeDefs = gql`
    extend type Query {
        getUsers(offset: Int, limit: Int, size: Int): [UsersResult!]!
        getUserOne(userId: ID!): User!
        me(refreshToken: String!): Me!
    }

    extend type Mutation {
        register(registerInput: RegisterInput): AuthRes!
        login(loginInput: LoginInput): AuthRes!
        logout(refreshToken: String!): String!
    }

    type UsersResult {
        items: [User]!, 
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
        id: ID!
        fullName: String,
        email: String!,
        about: String,
        status: String,
        location: UserLocation,
        photos: Photos,
        followed: Boolean,
        createdAt: String!,
        updatedAt: String!,
    }

    type UserLocation {
        country: String,
        city: String,
    }

    type Photos {
        small: String,
        large: String,
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
`

export interface IUser {
    id: string,
    fullName: string,
    email: string,
    about: string,
    location: IUserLocation,
    photos: IPhotos,
    followed: Boolean,
    createdAt: string,
    updatedAt: string,
}

interface IUserLocation {
}

interface IPhotos {
}