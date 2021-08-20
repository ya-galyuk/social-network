import {instance} from "./config";
import {TResponse} from "../types/ApiTypes";

interface IAuthMeResponse {
    userId: string;
    email: string;
    login: string;
}

interface IAuthLoginResponse {
    userId: string;
}

const me = () => {
    return instance.post<TResponse<IAuthMeResponse>>(`auth/me`, {})
        .then(res => res.data)
}

const login = (email: string, password: string, rememberMe = false) => {
    return instance.post<TResponse<IAuthLoginResponse>>(`auth/login`, {email, password, rememberMe})
        .then(res => res.data)
}

const logout = () => {
    return instance.delete<TResponse>(`auth/logout`)
        .then(res => res.data)
}

export const authAPI = {
    me,
    login,
    logout
};
