import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom'
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Navbar/>
            <main className="content">
                <Route path='/messages' render={() => <MessagesContainer/>}/>
                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
            </main>
        </div>
    );
}

export default App;
