import React, {ComponentType, FC} from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {getIsAuth} from "../redux/selectors/auth-selectors";
import {AppStateType} from "../redux/redux-store";

export function withAuthRedirect<WSP>(WrappedComponent: ComponentType<WSP>) {
    const RedirectComponent: FC<MapStatePropsType> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <WrappedComponent {...restProps as WSP}/>
    };

    let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        isAuth: getIsAuth(state)
    })

    return connect<MapStatePropsType, {}, WSP, AppStateType>(mapStateToProps, {})(RedirectComponent)
}

type MapStatePropsType = {
    isAuth: boolean
}
