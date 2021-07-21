import {instance} from "./config";

const login = () => {
    return instance.post(`auth/login`, {})
        .then(response => response.data)
}

export default {
    login
}