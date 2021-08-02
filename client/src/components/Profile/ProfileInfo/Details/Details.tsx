import React, {FC} from 'react';
import cls from "./Details.module.css";
import ProfileStatus from "../Status/ProfileStatus";
import {ProfileJobType} from "../../../../types/redux/ProfileTypes";

const Details: FC<PropsType> = (props) => {
    const {fullName, status, job, updateProfileStatus} = props

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
            <ProfileStatus status={status} updateProfileStatus={updateProfileStatus}/>
        </div>
    );
};

export default Details;

type PropsType = {
    fullName: string
    status: string
    job: ProfileJobType
    updateProfileStatus: (status: string) => void
}