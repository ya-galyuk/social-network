import {instance} from "./config";
import {IAuthLoginResponse, IAuthLogoutResponse, IAuthMeResponse} from "../types/ApiTypes";

const me = () => {
    return instance.post<IAuthMeResponse>(`auth/me`, {})
        .then(res => res.data)
}

const login = (email: string, password: string, rememberMe = false) => {
    return instance.post<IAuthLoginResponse>(`auth/login`, {email, password, rememberMe})
        .then(res => res.data)
}

const logout = () => {
    return instance.delete<IAuthLogoutResponse>(`auth/logout`)
        .then(res => res.data)
}

const exports = {
    me,
    login,
    logout
};

export default exports;
