import React from 'react';
// import cls from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {
    return (
        <>
            <ProfileInfo/>
            <PostsContainer store={props.store}/>
        </>
    );
};

export default Profile;