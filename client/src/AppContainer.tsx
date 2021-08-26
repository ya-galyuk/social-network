import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {App} from "./App";

import {ApolloProvider} from "@apollo/client";
import {client} from "./api/config";


const AppContainer = () => {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ApolloProvider>,
        </BrowserRouter>
    );
};

export default AppContainer;
