import React from 'react';
import cls from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import { v4 as uuidv4 } from 'uuid';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={cls.info}>
            <div className={cls.info__avatar}>
                <img className={cls.info__img} src={props.profile.photos.small} alt=""/>
            </div>

            <div className={cls.details}>
                <div className={cls.details__fullname}>{props.profile.fullName}</div>

                {props.profile.lookingForAJob
                    ? <p className={cls.details__description}>{props.profile.lookingForAJobDescription}</p>
                    : undefined
                }

                <ProfileStatus status={props.profile.status}/>
            </div>

            <div className={cls.contacts}>
                <div className={cls.contacts__title}>Contact Info</div>

                {props.profile.contactInfo.map(contact =>
                    <p className={cls.contacts__item} key={uuidv4()}>
                        <span>{contact.name}: </span>
                        <a href={contact.name.toLowerCase() === 'email'
                            ? `mailto:${contact.url}`
                            : contact.url
                        }>{contact.url}</a>
                    </p>
                )}
            </div>

            <div className={cls.about}>
                <div className={cls.about__title}>About</div>
                <p className={cls.about__description}>{props.profile.about}</p>
            </div>

            <div className={cls.educations}>
                <div className={cls.educations__title}>Educations</div>

                {props.profile.educations.map(education =>
                    <div className={cls.educations__item} key={uuidv4()}>
                        <div className={cls.educations__logo}>
                            <img className={cls.educations__logo} src={education.university.logo} alt=""/>
                        </div>
                        <div className={cls.educations__info}>
                            <p className={cls.educations__university}>{education.university.name}</p>
                            <p className={cls.educations__details}>{education.degree}, {education.fieldOfStudy}</p>
                            <p className={cls.educations__addressAndYears}>{education.country}, {education.city} {education.startYear} – {education.endYear}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileInfo;