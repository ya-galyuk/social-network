import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserProfile} from "../../redux/reducer/profile-reducer";
import {withRouter} from "react-router";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/selectors/profile-selectors";
import {getAuthorizedUserId, getIsAuth} from "../../redux/selectors/auth-selectors";

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
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthorizedUserId(state),
    isAuth: getIsAuth(state)
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