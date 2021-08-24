import {gql} from 'graphql-tag'
import {IPostComment} from "../comments/comments.schema";

export default gql`
    extend type Query {
        getPosts: [Post!]
        getPost(postId: ID!): Post!
    }

    extend type Mutation {
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        likePost(postId: ID!): Post!
    }

    extend type Subscription {
        newPost: Post!
    }

    type Post {
        _id: ID!
        href: String,
        author: String!,
        avatar: String,
        content: String!,
        likes: [PostLike]!,
        likeCount: Int!,
        comments: [PostComment]!
        commentCount: Int!,
        createdAt: String!
        updatedAt: String!
    }

    type PostLike {
        _id: ID!
        user: String!,
        createdAt: String!,
        updatedAt: String!,
    }
`

export interface IPost {
    _id: string,
    href: string | null,
    author: string,
    avatar: string | null,
    content: string,
    likes: IPostLike[],
    likeCount: number,
    comments: IPostComment[],
    commentCount: number,
    createdAt: string,
    updatedAt: string,
}

export interface IPostLike {
    user: string;
    createdAt: string;
    updatedAt: string;
}