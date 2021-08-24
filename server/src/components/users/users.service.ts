import * as yup from 'yup';

interface ILoginInput {
    email: string;
    password: string;
}

interface IRegisterInput {
    email: string;
    password: string;
    confirmPassword: string;
}

const userDto = (user: any) => {
    return {
        _id: user._id,
        email: user.email,
        isActivated: user.isActivated,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
        // TODO: add others fields
    }
}

const validateLoginInput = async (loginInput: ILoginInput) => {
    try {
        let schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        });
        return await schema.validateSync(loginInput, {abortEarly: false})
    } catch (e) {
        const errors: { [key: string]: string[] | string } = {}
        e.inner.forEach((item: { path: string; errors: string[]; }) => {
            errors[item.path] = item.errors
        })
        return {errors, valid: Object.keys(errors).length < 1}
    }
}

const validateRegisterInput = async (registerInput: IRegisterInput) => {
    try {
        let schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
            confirmPassword: yup.string().test('match', 'password do not match',
                function (confirmPassword) {
                    return confirmPassword === this.parent.password;
                }),
        });
        return await schema.validateSync(registerInput, {abortEarly: false})
    } catch (e) {
        const errors: { [key: string]: string[] | string } = {}
        e.inner.forEach((item: { path: string; errors: string[]; }) => {
            errors[item.path] = item.errors
        })
        return {errors, valid: Object.keys(errors).length < 1}
    }
}

export const UsersService = {
    userDto,
    validateLoginInput,
    validateRegisterInput,
    /*
    getAllUsers() {
        return Promise.resolve(undefined);
    },
    getOneUser() {
        return Promise.resolve(undefined);
    },
    createUser() {
        return Promise.resolve(undefined);
    },
    updateUser() {
        return Promise.resolve(undefined);
    },
    removeUser() {
        return Promise.resolve(undefined);
    },
    */
}