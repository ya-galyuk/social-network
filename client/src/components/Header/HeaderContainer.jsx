import {connect} from "react-redux";
import Header from "./Header";
import {setAuthUserData} from "../../redux/reducer/auth-reducer";
import React from "react";
import authAPI from "../../api/authAPI";

class HeaderContainer extends React.Component {
    componentDidMount() {
        // this.props.toggleIsLoading(true)
        authAPI.login().then(data => {
            // this.props.toggleIsLoading(false)
            if (data.resultCode === 0) {
                let {id, email, login} = data.user
                this.props.setAuthUserData(id, email, login)
            }
        })
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
    setAuthUserData,
})(HeaderContainer);