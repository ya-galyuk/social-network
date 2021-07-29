import React, {Component, lazy, Suspense} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {Switch, withRouter} from "react-router";
import {Route} from 'react-router-dom'
import {setIsInitialized} from "./redux/reducer/app-reducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/common/Preloader/Preloader";
import './App.css';

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const MessagesContainer = lazy(() => import('./components/Messages/MessagesContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = lazy(() => import('./components/Login/LoginContainer'));

class App extends Component {
    componentDidMount() {
        this.props.setIsInitialized()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            <div className="wrapper">
                <HeaderContainer/>
                <Navbar/>
                <main className="content">
                    <Suspense fallback={<div>Завантаження...</div>}>
                        <Switch>
                            <Route path='/messages' render={() => <MessagesContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {setIsInitialized})
)(App);
