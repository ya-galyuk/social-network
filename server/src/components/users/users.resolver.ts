import {UserModel} from "./users.model";
import bcrypt from 'bcrypt'
// import uuid from 'uuid'
import {AuthenticationError, UserInputError} from 'apollo-server-express'
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "./users.service";
import {IUser, IUserFollower} from "./users.schema";
import {checkAuth} from "../../middleware/auth-middleware";

interface IFindFilter {
    $text?: { $search: string },
    followed?: boolean
}

export const userResolvers = {
    User: {
        // @ts-ignore
        followed: async (parent: IUser, _, context) => {
            const authUser = checkAuth(context)
            const user = await UserModel.findById(authUser.id)
            const follower = user.followers.find((follower: IUserFollower) => follower.user.toString() === parent.id)
            return !!follower
        },
        followerCount: async (parent: IUser) => parent.followers.length,
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

            const user = await UserModel.findById(userData.id)
            return user
        },
        // @ts-ignore
        getUsers: async (_, args, context, info) => {
            try {
                let {offset, limit, filter: {query, followed}} = args
                let findFilter: IFindFilter | null = null
                let totalCount: number

                if (query) findFilter = {$text: {$search: query}}
                if (typeof followed === "boolean") findFilter = {...findFilter, followed: followed}

                if (findFilter) {
                    totalCount = await UserModel.find(findFilter).count()
                } else {
                    findFilter = {}
                    totalCount = await UserModel.countDocuments();
                }

                let users = await UserModel
                    .find(findFilter)
                    .skip(offset ? ((offset - 1) * limit) : 0)
                    .limit(limit)

                return {items: users, totalCount}
            } catch (e) {
                throw new Error(e)
            }
        },
        // @ts-ignore
        getUser: async (_, args, context, info) => {
            try {
                let {userId} = args
                let user = await UserModel.findById(userId)
                return user
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
            await TokensService.saveToken(userDto.id, tokens.refreshToken)

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
            await TokensService.saveToken(userDto.id, tokens.refreshToken)

            return {tokens: tokens, user: userDto}
        },
        // @ts-ignore
        logout: async (_, args, context, info) => {
            const {refreshToken} = args
            await TokensService.removeToken(refreshToken)
            return "Successful logout."
        },
        // @ts-ignore
        follow: async (_, args, context, info) => {
            const {userId} = args
            const authUser = checkAuth(context)

            const user = await UserModel.findById(authUser.id)
            if (!user) throw new UserInputError('User not found')

            const follower = user.followers.find((follower: IUserFollower) => follower.user.toString()  === userId)

            if (follower) {
                user.followers = user.followers.filter((follower: IUserFollower) => follower.user.toString() !== userId)
            } else {
                user.followers.push({user: userId})
            }

            await user.save()
            return user
        }
    }
}