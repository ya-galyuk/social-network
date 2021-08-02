import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import {ProfileContactsType, ProfileType} from "../../types/redux/ProfileTypes";

const Profile:FC<PropsType> = (props) => {
    const {profile, status, isOwner, updateProfileStatus, updatePhoto, saveProfileContacts,saveProfileAbout} = props
    return (
        <>
            <ProfileInfo profile={profile} status={status} isOwner={isOwner}
                         updateProfileStatus={updateProfileStatus} updatePhoto={updatePhoto}
                         saveProfileAbout={saveProfileAbout} saveProfileContacts={saveProfileContacts}/>
            <PostsContainer/>
        </>
    );
};

export default Profile;

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateProfileStatus: (status: string) => void
    updatePhoto: (file: File) => void
    saveProfileContacts: (contacts: ProfileContactsType) => Promise<void>
    saveProfileAbout: (about: string | null) => void
}