import React, {FC} from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/reducer/auth-reducer";
import {getIsAuth, getIsLoading, getLogin} from "../../redux/selectors/auth-selectors";
import {AppStateType} from "../../redux/redux-store";

const HeaderContainer: FC<PropsType> = (props) => {
    return <Header {...props}/>
}

let mapStateToProps = (state: AppStateType) => ({
    login: getLogin(state),
    isAuth: getIsAuth(state),
    isLoading: getIsLoading(state)
})

export default connect(mapStateToProps, {
    logout
})(HeaderContainer);

type PropsType = {
    login: string | null
    isAuth: boolean
    isLoading: boolean
    logout: () => void
}