import axios from "axios";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/'
})

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});