import {connect} from "react-redux";
import Header from "./Header";
import {getAuthUserData} from "../../redux/reducer/auth-reducer";
import React from "react";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, {
    getAuthUserData
})(HeaderContainer);