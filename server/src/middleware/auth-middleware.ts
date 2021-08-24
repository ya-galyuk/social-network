import {AuthenticationError} from 'apollo-server-express'
import {TokensService} from "../components/tokens/tokens.service";
import {IUser} from "../components/users/users.schema";

export const checkAuth = (context: any) => {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) {
        throw new AuthenticationError("Authorization header must be provided")
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
        throw new AuthenticationError("Authentication token must be 'Bearer [token]'")
    }

    const user = TokensService.validateAccessToken(accessToken)
    if (!user) {
        throw new AuthenticationError('Invalid/Expired token')
    }

    return <IUser>user
}