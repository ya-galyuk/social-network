import React from 'react';
// import cls from './Profile.module.css'
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <>
            <ProfileInfo/>
            <Posts state={props.state} dispatch={props.dispatch}/>
        </>
    );
};

export default Profile;