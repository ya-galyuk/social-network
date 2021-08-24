import {gql} from "graphql-tag";

export default gql`
    extend type Query {
        getUsers: [User!]!
        getUserOne(userId: ID!): User!
    }

    extend type Mutation {
        register(registerInput: RegisterInput): AuthRes!
        login(loginInput: LoginInput): AuthRes!
    }

    type AuthRes {
        user: User!
        tokens: Token!
    }

    type User {
        _id: ID!
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
    }
`

