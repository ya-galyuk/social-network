import {model, Schema} from "mongoose";

const postSchema = new Schema({
    href: {type: String, required: false},
    author: String,
    avatar: {type: String, required: false},
    content: String,
    createdAt: String,
    likes: [{
        username: String,
        createdAt: String
    }],
    comments: [{
        body: String,
        username: String,
        createdAt: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

export const PostsModel =model('Post', postSchema)