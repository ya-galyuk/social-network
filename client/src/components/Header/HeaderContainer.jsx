import {connect} from "react-redux";
import Header from "./Header";
import {setAuthUserData} from "../../redux/reducer/auth-reducer";
import React from "react";
import axios from "axios";

class HeaderContainer extends React.Component {
    componentDidMount() {
        // this.props.toggleIsLoading(true)
        axios.post(`http://localhost:5000/api/auth/login`, {
            withCredentials: true
        }).then(response => {
            // this.props.toggleIsLoading(false)
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.user
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