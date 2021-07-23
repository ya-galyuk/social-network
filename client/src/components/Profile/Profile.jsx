import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {
    return (
        <>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserProfile={props.updateUserProfile}/>
            <PostsContainer store={props.store}/>
        </>
    );
};

export default Profile;