import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/reducer/profile-reducer";
import profileAPI from "../../api/profileAPI";
import {withRouter} from "react-router";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = 1

        profileAPI.getProfile(userId).then(data => {
            // this.props.toggleIsLoading(false)
            this.props.setUserProfile(data)
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