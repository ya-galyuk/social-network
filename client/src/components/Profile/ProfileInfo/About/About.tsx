import React, {FC} from 'react';
import clsProfile from "../ProfileInfo.module.css";
import EditIcon from "../../../../assets/icons/edit.svg"

const About: FC<PropsType> = (props) => {
    const {about, isOwner, setEditMode} = props

    return (
        <div className={clsProfile.about}>
            {isOwner && <button className={clsProfile.btn__edit} onClick={() => setEditMode(true)}>
                <img src={EditIcon} alt="Edit Icon"/></button>}
            <h3 className={clsProfile.about__title}>About</h3>
            <p className={clsProfile.about__description}>{about}</p>
        </div>
    );
};

export default About;

type PropsType = {
    about: string | null
    isOwner: boolean
    setEditMode: (editMode: boolean) => void
}