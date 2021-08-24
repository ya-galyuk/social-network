import * as yup from "yup";
import {validateMiddleware} from "../../middleware/validate-middleware";

interface ICommentInput {
    body: string
}

const validateCommentInput = async (commentInput: ICommentInput) => {
    let schema = yup.object().shape({
        body: yup.string().trim().required(),
    });
    return validateMiddleware(schema, commentInput)
}

export const CommentsService = {
    validateCommentInput
}