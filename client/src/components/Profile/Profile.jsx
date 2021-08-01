import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {
    const {store, profile, status, isOwner, updateUserProfile, updatePhoto, saveProfileContacts,saveProfileAbout} = props
    return (
        <>
            <ProfileInfo profile={profile} status={status} isOwner={isOwner}
                         updateUserProfile={updateUserProfile} updatePhoto={updatePhoto}
                         saveProfileAbout={saveProfileAbout} saveProfileContacts={saveProfileContacts}/>
            <PostsContainer store={store}/>
        </>
    );
};

export default Profile;