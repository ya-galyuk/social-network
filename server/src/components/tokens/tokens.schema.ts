import {gql} from "graphql-tag";

export default gql`
    type Token {
        accessToken: String!
        refreshToken: String!,
    }
`

