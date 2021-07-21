import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/reducer/profile-reducer";
import {withRouter} from "react-router";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = 1

        axios.get(`http://localhost:5000/api/profile/${userId}`)
            .then(response => {
                // this.props.toggleIsLoading(false)
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    setUserProfile
})(WithUrlDataContainerComponent);