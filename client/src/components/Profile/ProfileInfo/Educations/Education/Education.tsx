import React, {FC} from 'react';
import cls from "./Education.module.css";
import {ProfileEducationsType} from "../../../../../types/redux/ProfileTypes";

const Education:FC<PropsType> = (props) => {
    const {education} = props
    return (
        <div className={cls.educations__item}>
            <div className={cls.educations__logo}>
                <img className={cls.educations__logo} src={education.university.logo} alt=""/>
            </div>
            <div className={cls.educations__info}>
                <p className={cls.educations__university}>{education.university.name}</p>
                <p className={cls.educations__details}>{education.degree}, {education.fieldOfStudy}</p>
                <p className={cls.educations__addressAndYears}>{education.country}, {education.city} {education.startYear} – {education.endYear}</p>
            </div>
        </div>
    );
};

export default Education;

type PropsType = {
    education: ProfileEducationsType
}