import jwt from "jsonwebtoken";
import config from '../../config/index'
import {TokensModel} from "./tokens.model";
import {IUser} from "../users/users.schema";

const generateToken = (payload: string | Buffer | object) => {
    const accessToken = jwt.sign(payload, config.jwt.accessSecret, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {expiresIn: '30d'})
    return {
        accessToken,
        refreshToken
    }
}

const validateAccessToken = (accessToken: string) => {
    try {
        const userData = jwt.verify(accessToken, config.jwt.accessSecret)
        return userData
    } catch (e) {
        return null;
    }
}

const validateRefreshToken = (refreshToken: string) => {
    try {
        const userData = jwt.verify(refreshToken, config.jwt.refreshSecret)
        return <IUser>userData
    } catch (e) {
        return null;
    }
}

// TODO: think how to save and delete some token for user's two or many devices
//  don't forget that token can destroy; after limited token rewrite; for one device - one token

// this only for one device
const saveToken = async (userId: string, refreshToken: string) => {
    const tokenData = await TokensModel.findOne({user: userId});
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await TokensModel.create({user: userId, refreshToken});
    return token;
}

const removeToken = async (refreshToken: string) => {
    const tokenData = await TokensModel.deleteOne({refreshToken})
    return tokenData
}

const findToken = async (refreshToken: string) => {
    const tokenData = await TokensModel.findOne({refreshToken})
    return tokenData
}

export const TokensService = {
    generateToken,
    validateAccessToken,
    validateRefreshToken,
    saveToken,
    removeToken,
    findToken
}