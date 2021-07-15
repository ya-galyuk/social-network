import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialog from "./components/Dialog/Dialog";
import {BrowserRouter, Route} from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Navbar/>
                <main className="content">
                    <Route path='/dialog' component={Dialog}/>
                    <Route path='/messages' component={Profile}/>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
