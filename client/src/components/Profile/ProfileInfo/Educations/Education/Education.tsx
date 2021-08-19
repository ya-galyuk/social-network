import React, {FC} from 'react';
import cls from "./Education.module.css";
import {ProfileEducationsType} from "../../../../../types/redux/ProfileTypes";

export const Education:FC<PropsType> = (props) => {
    const {education} = props
    return (
        <div className={cls.educations__item}>
            <div className={cls.educations__info}>
                <div className={cls.educations__addressAndYears}>{education.country}, {education.city} {education.startYear} – {education.endYear}</div>
                <div className={cls.educations__university}>{education.university.name}</div>
                <div className={cls.educations__details}>{education.degree}, {education.fieldOfStudy}</div>
            </div>
        </div>
    );
};

type PropsType = {
    education: ProfileEducationsType
}