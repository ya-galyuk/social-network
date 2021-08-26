import {ApolloError} from "@apollo/client/errors";

export const transformGraphQLErrors = (error: ApolloError | undefined) => error?.graphQLErrors[0]?.extensions?.errors || error?.graphQLErrors[0]?.message