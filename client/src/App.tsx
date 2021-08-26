import React, {FC, lazy, Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Switch} from "react-router";
import {Route} from 'react-router-dom'
import {actions} from "./redux/reducer/app-reducer";
import {checkAuth} from "./redux/reducer/auth-reducer";
import {HeaderPage} from "./components/Header/HeaderPage";
import {Preloader} from "./components/common/Preloader/Preloader";
import './App.css';
import {getAppInitialized} from "./redux/selectors/app-selectors";
import {Layout} from 'antd';

const {Content, Footer} = Layout;

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersPage'));
const LoginPage = lazy(() => import('./components/Auth/Login/LoginPage'));
const RegisterPage = lazy(() => import('./components/Auth/Register/RegisterPage'));
const ChatPage = lazy(() => import( "./pages/Chat/ChatPage"));

export const App: FC<PropsType> = (props) => {
    const initialized = useSelector(getAppInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(checkAuth())
        }
        actions.setIsInitialized()
    }, [])

    if (initialized) return <Preloader/>

    return (
        <Layout style={{minHeight: '100vh'}}>
            <HeaderPage/>
            <Content className={"content"}>
                <div className={"container"}>
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                            <Route path='/register' render={() => <RegisterPage/>}/>
                            <Route path='/chat' render={() => <ChatPage/>}/>
                            <Route path='*' render={() => <div>404</div>}/>
                        </Switch>
                    </Suspense>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Social Network ©2021 Created by Yaroslav</Footer>
        </Layout>
    );
}

type PropsType = {}