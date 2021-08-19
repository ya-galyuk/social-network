import React, {FC, lazy, Suspense, useEffect} from "react";
import {useSelector} from "react-redux";
import {Redirect, Switch} from "react-router";
import {Route} from 'react-router-dom'
import {actions} from "./redux/reducer/app-reducer";
import {HeaderPage} from "./components/Header/HeaderPage";
import {Preloader} from "./components/common/Preloader/Preloader";
import './App.css';
import {getAppInitialized} from "./redux/selectors/app-selectors";
import {Layout} from 'antd';

const {Content, Footer} = Layout;

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const MessagesContainer = lazy(() => import('./components/Messages/MessagesContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersPage'));
const LoginPage = lazy(() => import('./components/Login/LoginPage'));

export const App: FC<PropsType> = (props) => {
    const initialized = useSelector(getAppInitialized)

    useEffect(() => {
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
                            <Route path='/messages' render={() => <MessagesContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
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