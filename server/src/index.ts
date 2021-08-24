import {ApolloServer} from 'apollo-server-express';
import {PubSub} from 'graphql-subscriptions';
import {makeExecutableSchema} from "@graphql-tools/schema";


import express from 'express';
import mongoose from 'mongoose'
// import cors from 'cors';
import config from './config/index'


import userResolvers from './components/users/users.resolver'
import postResolvers from './components/posts/posts.resolver'
import commentResolvers from './components/comments/comments.resolver'

import postTypeDefs from "./components/posts/posts.schema";
import userTypeDefs from "./components/users/users.schema";
import tokenTypeDefs from "./components/tokens/tokens.schema";
import commentTypeDefs from "./components/comments/comments.schema";
import typeDefs from "./schema";


const schema = makeExecutableSchema({
    typeDefs: [typeDefs, userTypeDefs, postTypeDefs, tokenTypeDefs, commentTypeDefs],
    resolvers: [userResolvers, postResolvers, commentResolvers],
})

async function startApolloServer(schema: any) {
    const pubSub = new PubSub()
    const server = new ApolloServer({
        schema,
        context: ({req, res}) => ({req, res, pubSub})
    });
    await server.start();
    const app = express();

    // app.use(cors())

    server.applyMiddleware({app})

    const PORT = config.port
    await mongoose.connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('🚀 Mongodb connected'))
    await new Promise((resolve: any) => app.listen({port: PORT}, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(schema)

