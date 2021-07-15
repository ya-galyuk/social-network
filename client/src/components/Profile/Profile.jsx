import React from 'react';
import cls from './Profile.module.css'
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <>
            <ProfileInfo/>
            <Posts posts={props.state.posts}/>
        </>
    );
};

export default Profile;