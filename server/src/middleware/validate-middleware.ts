import {AnyObjectSchema} from "yup"

export const validateMiddleware = async (schema: AnyObjectSchema, input: any) => {
    try {
        return await schema.validateSync(input, {abortEarly: false})
    } catch (e) {
        const errors: { [key: string]: string[] | string } = {}
        e.inner.forEach((item: { path: string; errors: string[]; }) => {
            errors[item.path] = item.errors
        })
        return {errors, valid: Object.keys(errors).length < 1}
    }
}