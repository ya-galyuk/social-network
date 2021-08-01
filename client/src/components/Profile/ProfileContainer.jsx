import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    updateUserProfile,
    updatePhoto,
    saveProfileContacts,
    saveProfileAbout
} from "../../redux/reducer/profile-reducer";
import {withRouter} from "react-router";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/selectors/profile-selectors";
import {getAuthorizedUserId, getIsAuth} from "../../redux/selectors/auth-selectors";

class ProfileContainer extends React.Component {
    refreshProfile() {
        const {match, history, authorizedUserId, getUserProfile, getUserStatus} = this.props
        let userId = match.params.userId
        if (!userId) userId = authorizedUserId || 1
        if (!userId) history.push("/login")
        getUserProfile(userId)
        getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        const {match, profile, status, updateUserProfile, updatePhoto, saveProfileContacts, saveProfileAbout, ...restProps} = this.props
        return <Profile {...restProps} profile={profile} status={status} isOwner={!match.params.userId}
                        updateUserProfile={updateUserProfile} updatePhoto={updatePhoto}
                        saveProfileContacts={saveProfileContacts} saveProfileAbout={saveProfileAbout}/>
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
        updateUserProfile,
        updatePhoto,
        saveProfileContacts,
        saveProfileAbout
    }),
    withRouter,
)(ProfileContainer)