import {gql} from "graphql-tag";

export const userTypeDefs = gql`
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
        id: ID!
        fullName: String,
        email: String!,
        about: String,
        status: String,
        location: UserLocation,
        photos: Photos,
        followed: Boolean,
        followers: [UserFollower]!,
        followerCount: Int,
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
    
    type UserFollower {
        id: ID!
        user: String!,
        createdAt: String!,
        updatedAt: String!,
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