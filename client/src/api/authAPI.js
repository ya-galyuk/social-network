import {instance} from "./config";

const login = () => {
    return instance.post(`auth/login`, {})
        .then(response => response.data)
}

const exports = {
    login,
};

export default exports;
