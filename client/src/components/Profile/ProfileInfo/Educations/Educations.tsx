import React, {FC, useState} from 'react';
import cls from "../../Profile.module.css";
import {Education} from "./Education/Education";
import {v4 as uuidv4} from "uuid";
import {Timeline} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import Title from "../../common/Title";
import {useSelector} from "react-redux";
import {getEducations} from "../../../../redux/selectors/profile-selectors";

export const Educations: FC<PropsType> = (props) => {
    const {isOwner} = props

    const educations = useSelector(getEducations)

    const [editMode, setEditMode] = useState(false)

    if (!educations) return null

    const educationElements = educations?.map((education, index) =>
        <Timeline.Item key={uuidv4()} className={cls.educations__item}
                       dot={index === 0 ? <ClockCircleOutlined style={{fontSize: 16}}/> : undefined}>
            <Education education={education}/>
        </Timeline.Item>)

    return (
        <div className={cls.educations}>
            <Title title={"Education"} isOwner={isOwner} editMode={editMode} setEditMode={setEditMode}/>
            <Timeline>{educationElements}</Timeline>
        </div>
    );
};

type PropsType = {
    isOwner: boolean
}