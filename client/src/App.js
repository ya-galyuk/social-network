import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";
import {Route} from 'react-router-dom'

const App = (props) => {
    return (
        <div className="wrapper">
            <Header/>
            <Navbar/>
            <main className="content">
                <Route path='/messages' render={() => <Messages state={props.state.messagesPage} dispatch={props.dispatch}/>}/>
                <Route path='/profile'
                       render={() => <Profile state={props.state.profilePage} dispatch={props.dispatch}/>}/>
            </main>
        </div>
    );
}

export default App;
