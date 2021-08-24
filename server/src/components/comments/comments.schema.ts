import {gql} from 'graphql-tag'

export default gql`
    extend type Mutation {
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
    }

    type PostComment {
        _id: ID!
        body: String!,
        user: String!,
        createdAt: String!,
        updatedAt: String!,
    }
`

export interface IPostComment {
    _id: string,
    body: string,
    user: string,
    createdAt: string,
    updatedAt: string,
}