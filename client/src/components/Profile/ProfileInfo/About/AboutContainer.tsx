import React, {FC, useState} from 'react';
import {Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {saveProfileAbout} from "../../../../redux/reducer/profile-reducer";
import clsProfile from "../../Profile.module.css";
import {getAbout} from "../../../../redux/selectors/profile-selectors";
import Title from "../../common/Title";

const {Paragraph} = Typography;

export const AboutContainer: FC<PropsType> = React.memo((props) => {
    const {isOwner} = props

    const about = useSelector(getAbout)

    const [aboutStr, setAboutStr] = useState(about)
    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    const onChange = (value: string) => {
        if (aboutStr !== value) {
            dispatch(saveProfileAbout(value))
            setAboutStr(value)
        }
        setEditMode(false)
    }

    // if (!about) return null

    return (
        <div className={clsProfile.about}>
            <Title title={"About"} isOwner={isOwner} editMode={editMode} setEditMode={setEditMode}/>

            <Paragraph
                editable={isOwner && {
                    icon: <></>,
                    editing: editMode,
                    onChange,
                    onEnd: () => setEditMode(false),
                    onCancel: () => setEditMode(false)
                }}
            >
                {aboutStr}
            </Paragraph>
        </div>
    );
})

type PropsType = {
    isOwner: boolean
}
