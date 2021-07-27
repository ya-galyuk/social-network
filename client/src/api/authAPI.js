import {instance} from "./config";

const me = () => {
    return instance.post(`auth/me`, {})
        .then(response => response.data)
}

const login = (email, password, rememberMe) => {
    return instance.post(`auth/login`, {email, password, rememberMe})
        .then(response => response.data)
}

const logout = () => {
    return instance.delete(`auth/logout`)
        .then(response => response.data)
}

const exports = {
    me,
    login,
    logout
};

export default exports;
