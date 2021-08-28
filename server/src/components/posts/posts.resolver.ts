import {PostsModel} from './posts.model'
import {checkAuth} from "../../middleware/auth-middleware";
import {ForbiddenError, UserInputError} from "apollo-server-express";
import {IPost, IPostLike} from "./posts.schema";

export const postResolvers = {
    Post: {
        likeCount: async (parent: IPost) => parent.likes.length,
        commentCount: async (parent: IPost) => parent.comments.length,
    },
    Query: {
        getPosts: async () => {
            try {
                const posts = await PostsModel.find().sort({createAt: -1})
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },
        //@ts-ignore
        getPost: async (_, args) => {
            try {
                const {postId} = args
                const post = await PostsModel.findById(postId)
                return post ? post : new Error('Post not found')
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        // @ts-ignore
        createPost: async (_, args, context) => {
            const {body} = args
            const user = checkAuth(context)

            const post = await PostsModel.create({
                author: user.email,
                content: body,
                user: user.id,
            })

            context.pubsub.publish('NEW_POST', {newPost: post})
            return post
        },
        // @ts-ignore
        deletePost: async (_, args, context) => {
            try {
                const {postId} = args
                const user = checkAuth(context)
                const post = await PostsModel.findById(postId)

                if (user.id === post.user) {
                    await post.delete()
                    return 'Post deleted successful'
                }
                throw new ForbiddenError('Action not allowed')
            } catch (err) {
                throw new Error(err)
            }
        },
        // @ts-ignore
        likePost: async (_, args, context) => {
            const {postId} = args
            const user = checkAuth(context)

            const post = await PostsModel.findById(postId)
            if (!post) throw new UserInputError('Post not found')

            // TODO: check maybe find position index and delete by index will be more quickly
            const like = post.likes.find((like: IPostLike) => like.user === user.email)
            if (like) {
                post.likes = post.likes.filter((like: IPostLike) => like.user !== user.email)
            } else {
                post.likes.push({user: user.email})
            }
            await post.save()
            return post
        }
    },
    Subscription: {
        newPost: {
            // @ts-ignore
            subscribe: (_, __, {pubSub}) => pubSub.asyncIterator('NEW_POST')
        }
    }
}
