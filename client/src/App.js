import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom'
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from "./components/Login/Login";

const App = () => {
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

export default App;
