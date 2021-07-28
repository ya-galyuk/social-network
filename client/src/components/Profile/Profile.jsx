import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {
    const {store, profile, status, updateUserProfile} = props
    return (
        <>
            <ProfileInfo profile={profile} status={status} updateUserProfile={updateUserProfile}/>
            <PostsContainer store={store}/>
        </>
    );
};

export default Profile;