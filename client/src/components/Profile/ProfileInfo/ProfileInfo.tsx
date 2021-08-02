import React, {FC} from 'react';
import cls from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import AboutContainer from "./About/AboutContainer";
import Educations from "./Educations/Educations";
import Details from "./Details/Details";
import Avatar from "./Avatar/Avatar";
import ContactsContainer from "./Contacts/ContactsContainer";
import {ProfileContactsType, ProfileType} from "../../../types/redux/ProfileTypes";

const ProfileInfo:FC<PropsType> = (props) => {
    const {profile, status, isOwner, updateProfileStatus, updatePhoto, saveProfileContacts, saveProfileAbout} = props

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={cls.info}>
            <Avatar isOwner={isOwner} photos={profile.photos} updatePhoto={updatePhoto}/>

            <Details fullName={profile.fullName} status={status} job={profile.job}
                     updateProfileStatus={updateProfileStatus}/>

            <ContactsContainer profile={profile} isOwner={isOwner} saveProfileContacts={saveProfileContacts}/>

            <AboutContainer profile={profile} isOwner={isOwner} saveProfileAbout={saveProfileAbout}/>

            <Educations educations={profile.educations}/>
        </div>
    );
};

export default ProfileInfo;

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateProfileStatus: (status: string) => void
    updatePhoto: (file: File) => void
    saveProfileContacts: (contacts: ProfileContactsType) => Promise<void>
    saveProfileAbout: (about: string | null) => void
}

// TODO: add editMode for Educations and Details