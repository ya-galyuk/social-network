import * as yup from 'yup';
import {validateMiddleware} from "../../middleware/validate-middleware";

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
    let schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    return validateMiddleware(schema, loginInput)
}

const validateRegisterInput = async (registerInput: IRegisterInput) => {
    let schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().test('match', 'password do not match',
            function (confirmPassword) {
                return confirmPassword === this.parent.password;
            }),
    });
    return validateMiddleware(schema, registerInput)
}

export const UsersService = {
    userDto,
    validateLoginInput,
    validateRegisterInput,
}

interface ILoginInput {
    email: string;
    password: string;
}

interface IRegisterInput {
    email: string;
    password: string;
    confirmPassword: string;
}