import {UserModel} from "./users.model";
import bcrypt from 'bcrypt'
// import uuid from 'uuid'
import {AuthenticationError, UserInputError} from 'apollo-server-express'
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "./users.service";
import {IUser} from "./users.schema";

interface IUsersSearch {
    items: IUser[],
    totalCount: number
}

export const userResolvers = {
    UsersResult: {
        totalCount: async (parent: IUsersSearch) => parent.items.length,
    },
    Query: {
        // @ts-ignore
        me: async (_, args, context, info) => {
            const {refreshToken} = args

            if (!refreshToken) {
                throw new AuthenticationError('User are not authorized')
            }
            const userData = TokensService.validateRefreshToken(refreshToken)

            const tokenFromDB = await TokensService.findToken(refreshToken)
            if (!userData || !tokenFromDB) {
                throw new AuthenticationError('User are not authorized')
            }

            // @ts-ignore
            const user = await UserModel.findById(userData._id)
            const userDto = UsersService.userDto(user);

            return {user: {...userDto, id: userDto._id}}
        },
        // @ts-ignore
        getUsers: async (_, args, context, info) => {
            try {
                const {offset, limit} = args
                const users = await UserModel.find()
                    .skip(offset ? ((offset - 1) * limit) : 0)
                    .limit(limit)

                return users.map((user: any) => {
                    user.id = user._id
                    return user
                })
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    Mutation: {
        // @ts-ignore
        login: async (_, args, context, info) => {
            const {loginInput} = args
            const {email, password} = loginInput

            const {errors, valid} = await UsersService.validateLoginInput(loginInput)
            if (!valid && valid !== undefined) {
                throw new UserInputError('Validation errors', {errors})
            }

            const user = await UserModel.findOne({email})
            if (!user) {
                throw new AuthenticationError('User not found', {
                    errors: {email: 'This email is not found'}
                })
            }

            const isPassEqual = await bcrypt.compare(password, user.password)
            if (!isPassEqual) {
                throw new AuthenticationError('Wrong credentials', {
                    errors: {password: 'This password is not correct'}
                })
            }

            const userDto = UsersService.userDto(user);
            const tokens = TokensService.generateToken({...userDto})
            await TokensService.saveToken(userDto._id, tokens.refreshToken)

            return {tokens: tokens, user: {...userDto, id: userDto._id}}
        },
        // @ts-ignore
        register: async (_, args, context, info) => {
            const {registerInput} = args
            const {email, password} = registerInput

            const {errors, valid} = await UsersService.validateRegisterInput(registerInput)
            if (!valid && valid !== undefined) {
                throw new UserInputError('Validation errors', {errors})
            }

            const candidate = await UserModel.findOne({email})
            if (candidate) {
                throw new UserInputError('User is taken', {
                    errors: {email: 'This email is already present'}
                })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            // const activationLink = uuid.v4()

            const user = await UserModel.create({email, password: hashPassword})
            // const activationLinkMail = `${config.apiUrl}/api/activate/${activationLink}`
            // await mailService.sendActivationMail(email, activationLinkMail)

            const userDto = UsersService.userDto(user);
            const tokens = TokensService.generateToken({...userDto})
            await TokensService.saveToken(userDto._id, tokens.refreshToken)

            return {tokens: tokens, user: {...userDto, id: userDto._id}}
        },
        // @ts-ignore
        logout: async (_, args, context, info) => {
            const {refreshToken} = args
            await TokensService.removeToken(refreshToken)
            return "Successful logout."
        },
    }
}