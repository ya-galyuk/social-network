import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from 'react-router-dom'
import MessagesContainer from "./components/Messages/MessagesContainer";

const App = (props) => {
    return (
        <div className="wrapper">
            <Header/>
            <Navbar/>
            <main className="content">
                <Route path='/messages' render={() => <MessagesContainer store={props.store}/>}/>
                <Route path='/profile' render={() => <Profile store={props.store}/>}/>
            </main>
        </div>
    );
}

export default App;
