import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    updateProfileStatus,
    updatePhoto,
    saveProfileContacts,
    saveProfileAbout
} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/selectors/profile-selectors";
import {getAuthorizedUserId, getIsAuth} from "../../redux/selectors/auth-selectors";
import {AppStateType} from "../../redux/redux-store";
import {ProfileContactsType, ProfileType} from "../../types/redux/ProfileTypes";

class ProfileContainer extends React.Component<TProps & RouteComponentProps<TOwnProps>> {
    refreshProfile() {
        const {match, history, authorizedUserId, getUserProfile, getUserStatus} = this.props
        let {userId} = match.params
        if (!userId && authorizedUserId) userId = authorizedUserId
        if (!userId) history.push("/login")
        if (userId) {
            getUserProfile(userId)
            getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: RouteComponentProps<TOwnProps>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        const {
            match,
            profile,
            status,
            updateProfileStatus,
            updatePhoto,
            saveProfileContacts,
            saveProfileAbout,
            ...restProps
        } = this.props
        return <Profile {...restProps} profile={profile} status={status} isOwner={!match.params.userId}
                        updateProfileStatus={updateProfileStatus} updatePhoto={updatePhoto}
                        saveProfileContacts={saveProfileContacts} saveProfileAbout={saveProfileAbout}/>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthorizedUserId(state),
    isAuth: getIsAuth(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateProfileStatus,
        updatePhoto,
        saveProfileContacts,
        saveProfileAbout
    }),
    withRouter,
)(ProfileContainer)

type TProps = TMapStateProps & TDispatchStateProps

type TOwnProps = {
    userId?: string
}

type TMapStateProps = {
    profile: ProfileType
    status: string
    authorizedUserId: string | null
    isAuth: boolean
}

type TDispatchStateProps = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateProfileStatus: (status: string) => void
    updatePhoto: (file: File) => void
    saveProfileContacts: (contacts: ProfileContactsType) => Promise<void>
    saveProfileAbout: (about: string | null) => void
}
