import {gql} from 'graphql-tag'

export default gql`
    extend type Query {
        getPosts: [Post!]
#        getPostOne(postId: ID!): Post!
    }

    type Post {
        _id: ID!
        href: String,
        author: String!,
        avatar: String,
        content: String!,
        user: User!,
        likes: [PostLike],
        comments: [PostComment]
        createdAt: String!
        updatedAt: String!
    }

    type PostLike {
        _id: ID!
        user: User!,
        createdAt: String!,
        updatedAt: String!,
    }

    type PostComment {
        _id: ID!
        body: String!,
        user: User!,
        createdAt: String!,
        updatedAt: String!,
    }
`
