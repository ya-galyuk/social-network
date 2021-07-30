import React from 'react';
import cls from "../ProfileInfo.module.css";
import Education from "./Education/Education";
import {v4 as uuidv4} from "uuid";

const Educations = (props) => {
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