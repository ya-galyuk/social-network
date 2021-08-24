import {model, Schema} from "mongoose";


const userSchema = new Schema({
    username: {type: String},
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    about: {type: String, required: false,},
    status: {type: String, required: false,},
    location: {
        country: {type: String, required: false,},
        city: {type: String, required: false,},
    },
    photos: {
        small: {type: String, required: false,},
        large: {type: String, required: false,},
    },
    followed: {type: Boolean, default: false},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    createdAt: {type: Date, default: new Date().toISOString()},
    updatedAt: {type: Date, default: new Date().toISOString()},
})

export const UserModel = model('User', userSchema)