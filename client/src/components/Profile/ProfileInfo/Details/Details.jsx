import React from 'react';
import cls from "./Details.module.css";
import ProfileStatus from "../Status/ProfileStatus";

const Details = (props) => {
    const {fullName, status, job, updateUserProfile} = props

    return (
        <div className={cls.details}>
            <div className={cls.details__fullname}>{fullName}</div>
            {job.lookingForAJob
                ? <>
                    <p>Looking for a job</p>
                    <p className={cls.details__description}>{job.description}</p>
                </>
                : undefined
            }
            <ProfileStatus status={status} updateUserProfile={updateUserProfile}/>
        </div>
    );
};

export default Details;