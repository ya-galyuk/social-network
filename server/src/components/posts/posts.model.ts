import {model, Schema} from "mongoose";

const postSchema = new Schema({
    href: {type: String, required: false},
    author: String,
    avatar: {type: String, required: false},
    content: String,
    likes: [{
        user: String,
        createdAt: {type: Date, default: new Date().toISOString()},
        updatedAt: {type: Date, default: new Date().toISOString()},
    }],
    comments: [{
        body: String,
        user: String,
        createdAt: {type: Date, default: new Date().toISOString()},
        updatedAt: {type: Date, default: new Date().toISOString()},
    }],
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    createdAt: {type: Date, default: new Date().toISOString()},
    updatedAt: {type: Date, default: new Date().toISOString()},
})

export const PostsModel = model('Post', postSchema)