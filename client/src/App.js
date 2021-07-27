import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom'
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from "./components/Login/LoginContainer";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import {setIsInitialized} from "./redux/reducer/app-reducer";

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
                    <Route path='/messages' render={() => <MessagesContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginPage/>}/>
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
