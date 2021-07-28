import React from 'react';
import cls from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import {v4 as uuidv4} from 'uuid';
import Education from "./Education/Education";
import Contact from "./Contact/Contact";

const ProfileInfo = (props) => {
    const {profile, status, updateUserProfile} = props

    if (!profile) {
        return <Preloader/>
    }

    const contactElements = profile.contactInfo.map(contact => <Contact key={uuidv4()} contact={contact}/>)
    const educationElements = profile.educations.map(education => <Education key={uuidv4()} education={education}/>)

    return (
        <div className={cls.info}>
            <div className={cls.info__avatar}>
                <img className={cls.info__img} src={profile.photos.small} alt=""/>
            </div>

            <div className={cls.details}>
                <div className={cls.details__fullname}>{profile.fullName}</div>
                {profile.lookingForAJob
                    ? <p className={cls.details__description}>{profile.lookingForAJobDescription}</p>
                    : undefined
                }
                <ProfileStatus status={status} updateUserProfile={updateUserProfile}/>
            </div>

            <div className={cls.contacts}>
                <div className={cls.contacts__title}>Contact Info</div>
                {contactElements}
            </div>

            <div className={cls.about}>
                <div className={cls.about__title}>About</div>
                <p className={cls.about__description}>{profile.about}</p>
            </div>

            <div className={cls.educations}>
                <div className={cls.educations__title}>Educations</div>
                {educationElements}
            </div>
        </div>
    );
};

export default ProfileInfo;