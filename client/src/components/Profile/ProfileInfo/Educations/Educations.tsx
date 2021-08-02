import React, {FC} from 'react';
import cls from "../ProfileInfo.module.css";
import Education from "./Education/Education";
import {v4 as uuidv4} from "uuid";
import {ProfileEducationsType} from "../../../../types/redux/ProfileTypes";

const Educations:FC<PropsType> = (props) => {
    const {educations} = props

    const educationElements = educations.map(education =>
        <Education key={uuidv4()} education={education}/>)

    return (
        <div className={cls.educations}>
            <h3 className={cls.educations__title}>Educations</h3>
            {educationElements}
        </div>
    );
};

export default Educations;

type PropsType = {
    educations: Array<ProfileEducationsType>
}