import {ApolloServer} from 'apollo-server-express';
import {PubSub} from 'graphql-subscriptions';
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import {config} from './config'
import {schema} from "./schema";
import {graphqlUploadExpress} from "graphql-upload";

async function startApolloServer(schema: any) {
    const pubSub = new PubSub()
    const server = new ApolloServer({
        schema,
        context: ({req, res}) => ({req, res, pubSub})
    });
    await server.start();
    const app = express();

    app.use(graphqlUploadExpress());

    app.use(cors({
        credentials: true,
        origin: config.allowedOrigins
    }))

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

