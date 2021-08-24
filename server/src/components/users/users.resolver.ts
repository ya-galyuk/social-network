import {UserModel} from "./users.model";
import bcrypt from 'bcrypt'
// import uuid from 'uuid'
import {UserInputError, AuthenticationError} from 'apollo-server-express'
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "./users.service";

export default {
    Query: {
        getUsers: async () => {
            try {
                const users = await UserModel.find()
                return users
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    Mutation: {
        // @ts-ignore
        login: async (_, args, context, info) => {
            const {loginInput} = args
            const {res} = context
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

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return {tokens: tokens, user: userDto}
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
            return {tokens: tokens, user: userDto}
        }
    }
}
