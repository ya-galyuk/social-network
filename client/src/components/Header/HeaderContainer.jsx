import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/reducer/auth-reducer";
import {getIsAuth, getIsLoading, getLogin} from "../../redux/selectors/auth-selectors";

const HeaderContainer = (props) => {
    return <Header {...props}/>

}

let mapStateToProps = (state) => ({
    login: getLogin(state),
    isAuth: getIsAuth(state),
    isLoading: getIsLoading(state)
})

export default connect(mapStateToProps, {
    logout
})(HeaderContainer);