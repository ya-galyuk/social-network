import {gql} from "graphql-tag";
import {makeExecutableSchema} from "@graphql-tools/schema";

import {userResolvers} from './components/users/users.resolver'
import {postResolvers} from './components/posts/posts.resolver'
import {commentResolvers} from './components/comments/comments.resolver'

import {postTypeDefs} from "./components/posts/posts.schema";
import {userTypeDefs} from "./components/users/users.schema";
import {tokenTypeDefs} from "./components/tokens/tokens.schema";
import {commentTypeDefs} from "./components/comments/comments.schema";

const typeDefs = gql`
    type Query {_empty: String}
    type Mutation {_empty: String}
    type Subscription {_empty: String}
`

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, userTypeDefs, postTypeDefs, tokenTypeDefs, commentTypeDefs],
    resolvers: [userResolvers, postResolvers, commentResolvers],
})