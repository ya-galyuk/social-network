import React from 'react';
import cls from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <>
            <div className={cls.info__intro}>
                <img className={cls.info__img}
                     src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                     alt=""/>
            </div>
            <div className={cls.info__details}>
                <img className={cls.info__avatar} src={props.profile.photos.small} alt=""/>
                <h2>{props.profile.fullName}</h2>

                {props.profile.lookingForAJob
                    ? <>
                        <h3>Looking For A Job Description</h3>
                        <p>{props.profile.lookingForAJobDescription}</p>
                    </>
                    : undefined
                }

                <h3>Contact Info</h3>
                <p>Email: {props.profile.contactInfo.email}</p>

                <h3>About</h3>
                <p className={cls.info__description}>{props.profile.about}</p>
            </div>
        </>
    );
};

export default ProfileInfo;