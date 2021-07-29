import React from 'react';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import App from "./App";

const AppContainer = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    );
};

export default AppContainer;
