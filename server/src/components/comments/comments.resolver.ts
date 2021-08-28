import {checkAuth} from "../../middleware/auth-middleware";
import {ForbiddenError, UserInputError} from "apollo-server-express";
import {CommentsService} from "./comments.service";
import {PostsModel} from "../posts/posts.model";

export const commentResolvers = {
    Mutation: {
        // @ts-ignore
        createComment: async (_, args, context) => {
            try {
                const {postId, body} = args
                const user = checkAuth(context)

                const {errors, valid} = await CommentsService.validateCommentInput({body})
                if (!valid && valid !== undefined) {
                    throw new UserInputError('Validation errors', {errors})
                }

                const post = await PostsModel.findById(postId)
                if (!post) throw new UserInputError('Post not found')

                post.comments.unshift({body, user: user.email,})
                await post.save()

                return post
            } catch (err) {
                throw new Error(err)
            }
        },
        // @ts-ignore
        deleteComment: async (_, args, context) => {
            try {
                const {postId, commentId} = args
                const user = checkAuth(context)
                const post = await PostsModel.findById(postId)

                if (!post) throw new UserInputError('Post not found')

                const commentIndex = post.comments.findIndex((comment: any) => comment.id = commentId)
                if (post.comments[commentIndex].user !== user.email) {
                    throw new ForbiddenError('Action not allowed')
                }

                post.comment.slice(commentIndex, 1)
                await post.save()
                return post
            } catch (err) {
                throw new Error(err)
            }
        },
    },
}
