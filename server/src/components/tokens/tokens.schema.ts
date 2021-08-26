import {gql} from "graphql-tag";

export const tokenTypeDefs = gql`
    type Token {
        accessToken: String!
        refreshToken: String!,
    }
`

