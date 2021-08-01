import React from 'react';
import cls from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import AboutContainer from "./About/AboutContainer";
import Educations from "./Educations/Educations";
import Details from "./Details/Details";
import Avatar from "./Avatar/Avatar";
import ContactsContainer from "./Contacts/ContactsContainer";

const ProfileInfo = (props) => {
    const {profile, status, isOwner, updateUserProfile, updatePhoto, saveProfileContacts, saveProfileAbout} = props

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={cls.info}>
            <Avatar isOwner={isOwner} photos={profile.photos} updatePhoto={updatePhoto}/>

            <Details fullName={profile.fullName} status={status} job={profile.job}
                     updateUserProfile={updateUserProfile}/>

            <ContactsContainer profile={profile} isOwner={isOwner} saveProfileContacts={saveProfileContacts}/>

            <AboutContainer profile={profile} isOwner={isOwner} saveProfileAbout={saveProfileAbout}/>

            <Educations educations={profile.educations}/>
        </div>
    );
};

export default ProfileInfo;

// TODO: add editMode for Educations and Details