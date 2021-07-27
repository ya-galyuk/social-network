import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserProfile} from "../../redux/reducer/profile-reducer";
import {withRouter} from "react-router";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.authorizedUserId || 1
        if (!userId) this.props.history.push("/login")
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateUserProfile={this.props.updateUserProfile}/>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserProfile
    }),
    withRouter,
    // withAuthRedirect,
)(ProfileContainer)