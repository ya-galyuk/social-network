import React from 'react';
import cls from "../ProfileInfo.module.css";
import Contact from "./Contact/Contact";
import {v4 as uuidv4} from "uuid";
import clsProfile from "../ProfileInfo.module.css";
import EditIcon from "../../../../assets/icons/edit.svg";

const Contacts = props => {
    const {profile, isOwner, setEditMode} = props

    const contactElements = Object.keys(profile.contacts).map(key =>
        <Contact key={uuidv4()} itemTitle={key} value={profile.contacts[key]}/>)

    return (
        <div className={cls.contacts}>
            {isOwner && <button className={clsProfile.btn__edit} onClick={() => setEditMode(true)}>
                <img src={EditIcon} alt="Edit Icon"/></button>}
            <h3 className={cls.contacts__title}>Contact Info</h3>
            {contactElements}
        </div>
    );
};

export default Contacts;