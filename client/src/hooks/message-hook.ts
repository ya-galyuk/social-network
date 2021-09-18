import {useEffect} from "react";
import {message} from "antd";
import {transformGraphQLErrors} from "../utils/helpers/error-helpers";
import {ApolloError} from "@apollo/client";


export const useMessageError = (error: ApolloError | undefined) => {
    useEffect(() => {
        if (error) {
            console.log(error)
            let errors = transformGraphQLErrors(error)
            message.error(JSON.stringify(errors, null, 2))
        }
    }, [error])
    return error
}

export const useMessageLoading = (loading: boolean) => {
    useEffect(() => {
        if (loading) {
            message.loading('Loading...')
        }
    }, [loading])
    return loading
}